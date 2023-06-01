import { memo } from "react";
import styles from "./DatePicker.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerProps } from "./DatePicker.props";
import DatePickerPackage from "react-datepicker";
import { DateInput } from "@components/DateInput/DateInput";

const DatePicker = memo(
  ({ date, setDate, name }: DatePickerProps): JSX.Element => {
    const dateHandler = (date: Date | null) => {
      if (date) {
        setDate(date);
      }
    };
    return (
      <div className={styles.datePicker}>
        <DatePickerPackage
          selected={date}
          onChange={(date) => dateHandler(date)}
          showTimeSelect
          open
          inline
        />
        <DateInput name={name} date={date} />
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
