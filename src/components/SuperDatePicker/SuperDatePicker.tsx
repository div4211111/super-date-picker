import { memo, useCallback, useEffect, useState } from "react";
import styles from "./SuperDatePicker.module.scss";
import { SuperDatePickerProps } from "./SuperDatePicker.props";
import { Button } from "@components/Button/Button";
import cn from "classnames";
import { DatePopover } from "..";
import { ShortDate } from "@shared/types";
import dateMath from "@shared/dateMath";
import moment from "moment";
import { QuickSelectPopover } from "@components/QuickSelectPopover/QuickSelectPopover";

const SuperDatePicker = memo(
  ({
    start = "now-30m",
    end = "now",
    onTimeChange,
    isLoading,
    isDisabled,
    onRefresh,
    refreshInterval,
    recentlyUsedRanges,
    onRefreshChange,
  }: SuperDatePickerProps): JSX.Element => {
    const [timeStart, setTimeStart] = useState<ShortDate>(start);
    const [timeEnd, setTimeEnd] = useState<ShortDate>(end);
    const [isOpenStart, setIsOpenStart] = useState<boolean>(false);
    const [isOpenEnd, setIsOpenEnd] = useState<boolean>(false);
    const [isOpenQuick, setIsOpenQuick] = useState<boolean>(false);
    const [isNeedUpdate, setIsNeedUpdate] = useState<boolean>(false);

    const isRangeInvalid = useCallback(
      (s: ShortDate, e: ShortDate) => {
        if (s === "now" && e === "now") {
          return true;
        }
        const startMoment = dateMath.parse(timeStart);
        const endMoment = dateMath.parse(timeEnd, { roundUp: true });

        const isInvalid =
          !startMoment ||
          !endMoment ||
          !startMoment.isValid() ||
          !endMoment.isValid() ||
          !moment(startMoment).isValid() ||
          !moment(endMoment).isValid() ||
          startMoment.isAfter(endMoment);

        return isInvalid;
      },
      [timeStart, timeEnd]
    );

    const buttonHandler = () => {
      if (isNeedUpdate) {
        onTimeChange({
          start: timeStart,
          end: timeEnd,
          isInvalid: isRangeInvalid(timeStart, timeEnd),
        });
      } else {
        onRefresh &&
          onRefresh({
            start: timeStart,
            end: timeEnd,
            refreshInterval: refreshInterval as number,
          });
      }
      setIsNeedUpdate(false);
    };
    useEffect(() => {
      if (timeStart !== start || timeEnd !== end) {
        setIsNeedUpdate(true);
      }
    }, [timeStart, timeEnd, end, start]);

    return (
      <div className={styles.superDatePicker}>
        <div className={styles.dateContainer}>
          <QuickSelectPopover
            onTimeChange={onTimeChange}
            recentlyUsedRanges={recentlyUsedRanges}
            refreshInterval={refreshInterval}
            start={timeStart}
            end={timeEnd}
            isInvalid={isRangeInvalid(timeStart, timeEnd)}
            isOpen={isOpenQuick}
            setIsOpen={setIsOpenQuick}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            onRefresh={onRefresh}
            onRefreshChange={onRefreshChange}
          />
          <div className={styles.buttonsDate}>
            <DatePopover
              date={timeStart}
              setDate={setTimeStart}
              name={"Start date"}
              type={"start"}
              isOpen={isOpenStart}
              setIsOpen={setIsOpenStart}
              validState={
                !isNeedUpdate
                  ? "default"
                  : isRangeInvalid(timeStart, timeEnd)
                  ? "error"
                  : "success"
              }
            />
            <span className={styles.buttonSeparator}>→</span>
            <DatePopover
              date={timeEnd}
              setDate={setTimeEnd}
              name={"End date"}
              type={"end"}
              isOpen={isOpenEnd}
              setIsOpen={setIsOpenEnd}
              validState={
                !isNeedUpdate
                  ? "default"
                  : isRangeInvalid(timeStart, timeEnd)
                  ? "error"
                  : "success"
              }
            />
          </div>
        </div>
        <Button
          className={cn(styles.applyButton, {
            [styles.update]: isNeedUpdate,
          })}
          onClick={buttonHandler}
          disabled={isLoading || isDisabled}
        >
          {isLoading ? "Updating" : isNeedUpdate ? "Update" : "Refresh"}
        </Button>
      </div>
    );
  }
);

SuperDatePicker.displayName = "SuperDatePicker";

export { SuperDatePicker };
