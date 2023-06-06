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
import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from "@shared/relativeUtils";
import dateMath from "@shared/dateMath";
import { ShortDate } from "@shared/types";

const RelativeTimePicker = memo(
  ({ name, date, setDate }: RelativeTimePickerProps) => {
    const [count, setCount] = useState<number>(parseRelativeParts(date).count);
    const [unit, setUnit] = useState<TimeUnitAllId>(
      parseRelativeParts(date).unit as TimeUnitAllId
    );
    const [round, setRound] = useState<boolean>(parseRelativeParts(date).round);
    const [errorValue, setErrorValue] = useState<string>("");

    const setDateHandler = () => {
      if (count === undefined || count <= 0) {
        return;
      }
      const date = toRelativeStringFromParts({
        count,
        unit,
        round,
      });
      setDate(date);
    };

    const changeUnitHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      setUnit(event.target.value as TimeUnitAllId);
    };

    const changeRoundHandler = () => {
      setRound((prev) => !prev);
    };

    const changeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (parseInt(event.target.value) <= 0) {
        setErrorValue("Must be >= 0");
      } else {
        setErrorValue("");
      }

      setCount(parseInt(event.target.value));
    };
    useEffect(() => {
      setDateHandler();
    }, [count, unit, round]);
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
            id={"rounded-checkbox" + name}
            checked={round}
            onChange={() => changeRoundHandler()}
          />
          <label htmlFor={"rounded-checkbox" + name}>
            {relativeRoundingLabels[unit.substring(0, 1) as TimeUnitId]}
          </label>
        </div>
        <DateInput
          name={name}
          date={
            dateMath.parse(date)?.format("MMMM Do YYYY, h:mm:ss a") as ShortDate
          }
        />
      </div>
    );
  }
);

RelativeTimePicker.displayName = "RelativeTimePicker";
export { RelativeTimePicker };
