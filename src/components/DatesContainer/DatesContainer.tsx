import { memo, useState } from "react";
import { DatesContainerProps } from "./DatesContainer.props";
import styles from "./DatesContainer.module.scss";
import { DatePicker, RelativeTimePicker, SetNow } from "..";
import cn from "classnames";
import { DateMode } from "@shared/types";

const DatesContainer = memo(
  ({
    date,
    setDate,
    name,
    type,
    setDateMode,
    dateMode,
  }: DatesContainerProps): JSX.Element => {
    const [activeTab, setActiveTab] = useState<DateMode>(dateMode);
    const changeTabHandler = (mode: DateMode) => {
      setActiveTab(mode);
      setDateMode(mode);
    };
    return (
      <div className={styles.datesContainer}>
        <div className={styles.buttonsTitle}>
          <button
            className={cn(styles.buttonTitle, {
              [styles.active]: activeTab === "absolute",
            })}
            onClick={() => changeTabHandler("absolute")}
          >
            Absolute
          </button>
          <button
            className={cn(styles.buttonTitle, {
              [styles.active]: activeTab === "relative",
            })}
            onClick={() => changeTabHandler("relative")}
          >
            Relative
          </button>
          <button
            className={cn(styles.buttonTitle, {
              [styles.active]: activeTab === "now",
            })}
            onClick={() => changeTabHandler("now")}
          >
            Now
          </button>
        </div>
        <div className={styles.content}>
          {activeTab === "absolute" && (
            <DatePicker date={date} setDate={setDate} name={name} />
          )}
          {activeTab === "relative" && (
            <RelativeTimePicker date={date} setDate={setDate} name={name} />
          )}
          {activeTab === "now" && <SetNow setDate={setDate} type={type} />}
        </div>
      </div>
    );
  }
);

DatesContainer.displayName = "DatesContainer";

export { DatesContainer };
