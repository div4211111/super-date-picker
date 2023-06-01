import { memo } from "react";
import { InputProps } from "./Input.props";
import styles from "./Input.module.scss";
import cn from "classnames";

const Input = memo(({ error, ...props }: InputProps): JSX.Element => {
  return (
    <div className={styles.inputWrapper}>
      <div
        className={cn(styles.inputContainer, {
          [styles.error]: error,
        })}
      >
        <input {...props} className={styles.input} />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
