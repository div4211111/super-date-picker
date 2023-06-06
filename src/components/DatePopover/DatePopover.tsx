import { memo, useEffect, useRef, useState } from "react";
import { DatePopoverProps } from "./DatePopover.props";
import { usePopper } from "react-popper";
import styles from "./DatePopover.module.scss";
import cn from "classnames";
import { DatesContainer } from "..";
import { getDateMode } from "@shared/dateModes";
import { DateMode } from "@shared/types";

const DatePopover = memo(
  ({
    date,
    setDate,
    name,
    type,
    isOpen,
    setIsOpen,
    validState,
  }: DatePopoverProps): JSX.Element => {
    const refElement = useRef<HTMLButtonElement>(null);
    const popperElement = useRef<HTMLDivElement>(null);
    const arrowElement = useRef(null);
    const [dateMode, setDateMode] = useState<DateMode>(getDateMode(date));
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
          className={cn(styles.dateButton, {
            [styles.dateButtonStart]: type === "start",
            [styles.dateButtonEnd]: type === "end",
            [styles.active]: isOpen,
            [styles.error]: validState === "error",
            [styles.success]: validState === "success",
          })}
          ref={refElement}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {date}
        </button>
        <div
          ref={popperElement}
          style={PopperStyles.popper}
          {...PopperAttributes.popper}
          className={cn(styles.popper, {
            [styles.open]: isOpen,
          })}
        >
          <DatesContainer
            date={date}
            setDate={setDate}
            name={name}
            type={type}
            setDateMode={setDateMode}
            dateMode={dateMode}
          />
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

DatePopover.displayName = "DatePopover";
export { DatePopover };
