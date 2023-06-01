import { memo } from "react";
import { SetNowProps } from "./SetNow.props";
import styles from "./SetNow.module.scss";
import { Button } from "..";

const SetNow = memo(({ setIsNow, type }: SetNowProps): JSX.Element => {
  return (
    <div className={styles.setNow}>
      <p>
        Setting the time to "now" means that on every refresh this time will be
        set to the time of the refresh.
      </p>
      <Button onClick={() => setIsNow(true)}>
        Set {type} date and time to now
      </Button>
    </div>
  );
});

SetNow.displayName = "SetNow";
export { SetNow };
