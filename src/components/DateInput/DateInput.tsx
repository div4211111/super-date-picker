import { memo } from "react";
import styles from "./DateInput.module.scss";
import moment from "moment";
import { DateInputProps } from "./DateInput.props";

const DateInput = memo(({ name, date }: DateInputProps): JSX.Element => {
  return (
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
  );
});

DateInput.displayName = "DateInput";
export { DateInput };
