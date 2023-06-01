import { ChangeEvent, memo, useEffect, useState } from "react";
import styles from "./RelativeTimePicker.module.scss";
import { RelativeTimePickerProps } from "./RelativeTimePicker.props";
import { Input, Select } from "..";
import {
  relativeOptions,
  TimeUnitAllId,
  relativeRoundingLabels,
  TimeUnitId,
} from "@shared/timeOptions";
import { DateInput } from "@components/DateInput/DateInput";
import { toRelativeStringFromParts } from "@shared/relativeUtils";
import dateMath from "@shared/dateMath";

const RelativeTimePicker = memo(
  ({ name, date, setDate }: RelativeTimePickerProps) => {
    const [count, setCount] = useState<number>(1);
    const [unit, setUnit] = useState<TimeUnitAllId>("s");
    const [round, setRound] = useState<boolean>(false);
    const [errorValue, setErrorValue] = useState<string>("");
    const changeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (parseInt(event.target.value) <= 0) {
        setErrorValue("Must be >= 0");
      } else {
        setErrorValue("");
      }

      setCount(parseInt(event.target.value));
    };
    const changeUnitHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      setUnit(event.target.value as TimeUnitAllId);
    };

    const setDateHandler = () => {
      if (count === undefined || count <= 0) {
        return;
      }
      const date = toRelativeStringFromParts({
        count,
        unit,
        round,
      });
      const parsedDate = dateMath.parse(date)?.toDate();
      if (!parsedDate) {
        return;
      }
      setDate(parsedDate);
    };

    useEffect(() => {
      setDateHandler();
    }, [unit, round, count]);

    return (
      <div className={styles.relativeTimePicker}>
        <div className={styles.inputs}>
          <Input
            type={"number"}
            value={count}
            onChange={changeValueHandler}
            error={errorValue}
          />
          <Select
            options={relativeOptions}
            value={unit}
            onChange={changeUnitHandler}
          />
        </div>
        <div className={styles.rounded}>
          <input
            type="checkbox"
            id={"rounded-checkbox"}
            checked={round}
            onChange={() => setRound((prev) => !prev)}
          />
          <label htmlFor="rounded-checkbox">
            {relativeRoundingLabels[unit.substring(0, 1) as TimeUnitId]}
          </label>
        </div>
        <DateInput name={name} date={date} />
      </div>
    );
  }
);

RelativeTimePicker.displayName = "RelativeTimePicker";
export { RelativeTimePicker };
