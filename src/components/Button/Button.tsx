import { memo } from "react";
import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.props";
import cn from "classnames";

const Button = memo(
  ({
    styleType = "primary",
    className,
    ...props
  }: ButtonProps): JSX.Element => {
    return (
      <button
        className={cn(styles.button, className, {
          [styles.success]: styleType === "success",
          [styles.error]: styleType === "error",
          [styles.disabled]: props.disabled,
        })}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
