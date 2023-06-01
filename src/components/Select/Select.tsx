import { memo } from "react";
import styles from "./Select.module.scss";
import cn from "classnames";
import { SelectProps } from "./Select.props";

const Select = memo(({ options, ...props }: SelectProps): JSX.Element => {
  return (
    <div className={styles.selectWrapper}>
      <div className={cn(styles.selectContainer)}>
        <select {...props} className={styles.select}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

Select.displayName = "Select";
export { Select };
