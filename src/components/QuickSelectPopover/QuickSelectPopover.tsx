import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { QuickSelectPopoverProps } from "./QuickSelectPopover.props";
import { usePopper } from "react-popper";
import styles from "./QuickSelectPopover.module.scss";
import cn from "classnames";
import CalendarIcon from "@assets/calendar.svg";
import ArrowIcon from "@assets/arrow.svg";
import { parseTimeParts } from "@shared/quickSelectUtils";
import { Button, Input, Select } from "..";
import {
  NEXT,
  TimeUnitId,
  commonDurationRanges,
  intervalOptions,
  millisecondsToTime,
  timeTenseOptions,
  timeToMilliseconds,
  timeUnitsOptions,
} from "@shared/timeOptions";
import { DurationRange } from "@shared/types";

const QuickSelectPopover = memo(
  ({
    onTimeChange,
    onRefresh,
    onRefreshChange,
    start,
    end,
    refreshInterval,
    isInvalid,
    isOpen,
    setIsOpen,
    recentlyUsedRanges,
    setTimeEnd,
    setTimeStart,
  }: QuickSelectPopoverProps): JSX.Element => {
    const [timeTense, setTimeTense] = useState(
      parseTimeParts(start, end).timeTense
    );
    const [timeUnits, setTimeUnits] = useState(
      parseTimeParts(start, end).timeUnits
    );
    const [timeValue, setTimeValue] = useState(
      parseTimeParts(start, end).timeValue
    );
    const [intervalUnit, setIntervalUnit] = useState<
      "seconds" | "minutes" | "hours"
    >("seconds");
    const [intervalValue, setIntervalValue] = useState(
      millisecondsToTime(refreshInterval as number, intervalUnit)
    );
    const [isPaused, setIsPaused] = useState(true);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
    const refElement = useRef<HTMLButtonElement>(null);
    const popperElement = useRef<HTMLDivElement>(null);
    const arrowElement = useRef(null);
    const { styles: PopperStyles, attributes: PopperAttributes } = usePopper(
      refElement.current,
      popperElement.current,
      {
        placement: "bottom",
        modifiers: [
          {
            name: "arrow",
            options: {
              element: arrowElement.current,
              padding: 8,
            },
          },
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      }
    );

    const changeTenseHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      setTimeTense(e.target.value);
    };
    const changeUnitsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      setTimeUnits(e.target.value as TimeUnitId);
    };
    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTimeValue(parseInt(e.target.value));
    };

    const commandExecutor = (range: DurationRange) => {
      onTimeChange({
        start: range.start,
        end: range.end,
        isInvalid,
      });
      console.log(range);
      setTimeStart(range.start);
      setTimeEnd(range.end);
      setIsOpen(false);
    };

    const applyQuickSelect = () => {
      if (timeTense === NEXT) {
        commandExecutor({ start: "now", end: `now+${timeValue}${timeUnits}` });
        return;
      }

      commandExecutor({ start: `now-${timeValue}${timeUnits}`, end: "now" });
    };
    const CommandButton = ({
      range,
      wrap = true,
    }: {
      range: DurationRange;
      wrap?: boolean;
    }) => {
      return (
        <li
          className={cn(styles.usedItem, {
            [styles.nowrap]: !wrap,
          })}
        >
          <button
            className={styles.usedButton}
            onClick={() => commandExecutor(range)}
          >
            {range.label ? range.label : `${range.start} to ${range.end}`}
          </button>
        </li>
      );
    };
    const changeIntervalValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setIntervalValue(parseInt(e.target.value));
    };

    const changeIntervalUnitHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      setIntervalUnit(e.target.value as "seconds" | "minutes" | "hours");
    };
    const toggleInterval = () => {
      const intervalHandler = () => {
        onRefresh?.({
          start,
          end,
          refreshInterval: timeToMilliseconds(intervalValue, intervalUnit),
        });
      };

      if (isPaused) {
        const id = setInterval(
          intervalHandler,
          timeToMilliseconds(intervalValue, intervalUnit)
        );
        setIntervalId(id);
        setIsPaused(false);
      } else {
        clearInterval(intervalId);
        setIsPaused(true);
      }
      onRefreshChange?.({
        isPaused,
        refreshInterval: timeToMilliseconds(intervalValue, intervalUnit),
      });
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popperElement.current &&
          refElement.current &&
          !popperElement.current.contains(event.target as Node) &&
          !refElement.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
      // eslint-disable-next-line
    }, [isOpen]);

    return (
      <>
        <button
          className={cn(styles.quickSelectButton, {
            [styles.active]: isOpen,
          })}
          ref={refElement}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <img src={CalendarIcon} alt="calendar" />
          <img src={ArrowIcon} alt="arrow" />
        </button>
        <div
          ref={popperElement}
          style={PopperStyles.popper}
          {...PopperAttributes.popper}
          className={cn(styles.popper, {
            [styles.open]: isOpen,
          })}
        >
          <div className={styles.content}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Quick select</legend>
              <div className={styles.seciton}>
                <div className={styles.inputs}>
                  <Select
                    value={timeTense}
                    options={timeTenseOptions}
                    onChange={changeTenseHandler}
                  />
                  <Input
                    type={"number"}
                    value={timeValue}
                    onChange={changeValueHandler}
                  />
                  <Select
                    value={timeUnits}
                    options={timeUnitsOptions}
                    onChange={changeUnitsHandler}
                  />
                  <Button onClick={applyQuickSelect}>Apply</Button>
                </div>
              </div>
              <hr className={styles.hr} />
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Commonly used</legend>
              <div className={styles.seciton}>
                <ul className={styles.commonlyUsed}>
                  {commonDurationRanges.map((el) => (
                    <CommandButton
                      key={`${el.start} to ${el.end}`}
                      range={el}
                    />
                  ))}
                </ul>
              </div>
              <hr className={styles.hr} />
            </fieldset>
            {recentlyUsedRanges && recentlyUsedRanges.length > 0 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                  Recently used date ranges
                </legend>
                <div className={styles.seciton}>
                  <ul className={styles.recentlyUsed}>
                    {recentlyUsedRanges.map((el) => (
                      <CommandButton
                        key={`${el.start} to ${el.end}`}
                        range={el}
                        wrap={false}
                      />
                    ))}
                  </ul>
                </div>
                <hr className={styles.hr} />
              </fieldset>
            )}
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Refresh every</legend>
              <div className={styles.seciton}>
                <div className={styles.inputs}>
                  <Input
                    type={"number"}
                    value={intervalValue}
                    onChange={changeIntervalValueHandler}
                  />
                  <Select
                    options={intervalOptions}
                    value={intervalUnit}
                    onChange={changeIntervalUnitHandler}
                  />
                  <Button onClick={toggleInterval}>
                    {isPaused ? "Start" : "Stop"}
                  </Button>
                </div>
              </div>
            </fieldset>
          </div>
          <div
            className={styles.arrow}
            ref={arrowElement}
            style={PopperStyles.arrow}
          />
        </div>
      </>
    );
  }
);

QuickSelectPopover.displayName = "QuickSelectPopover";
export { QuickSelectPopover };
