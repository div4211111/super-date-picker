import { memo } from "react";
import styles from "./DatePicker.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerProps } from "./DatePicker.props";
import DatePickerPackage from "react-datepicker";
import moment from "moment";

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

        <div className={styles.inputContainer}>
          <label htmlFor="" className={styles.label}>
            {name}
          </label>
          <input
            type="text"
            className={styles.input}
            readOnly
            value={moment(date).format("MMMM Do YYYY, h:mm:ss a")}
          />
        </div>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
