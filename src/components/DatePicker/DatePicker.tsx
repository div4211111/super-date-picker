import { memo } from "react";
import styles from "./DatePicker.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerProps } from "./DatePicker.props";
import DatePickerPackage from "react-datepicker";
import { DateInput } from "@components/DateInput/DateInput";
import "@styles/popper.scss";
import dateMath from "@shared/dateMath";
import moment from "moment";

const DatePicker = memo(
  ({ date, setDate, name }: DatePickerProps): JSX.Element => {
    const dateHandler = (absoluteDate: Date | null) => {
      if (absoluteDate) {
        setDate(moment(absoluteDate).toISOString());
      }
    };
    return (
      <div className={styles.datePicker}>
        <DatePickerPackage
          selected={dateMath.parse(date)?.toDate()}
          onChange={(absoluteDate) => dateHandler(absoluteDate)}
          showTimeSelect
          open
          inline
        />
        <DateInput
          name={name}
          date={
            dateMath.parse(date)?.format("MMMM Do YYYY, h:mm:ss a") as string
          }
        />
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
