import moment from "moment";
import _isString from "lodash/isString";
import dateMath from "./dateMath";
import { relativeUnitsFromLargestToSmallest } from "./relativeUtils";
import { LAST, NEXT, TimeUnitId } from "./timeOptions";
import { QuickSelect } from "./types";
import { DATE_MODES } from "./dateModes";

const isNow = (value: string) => value === DATE_MODES.NOW;

export const parseTimeParts = (start: string, end: string): QuickSelect => {
  const results: QuickSelect = {
    timeTense: LAST,
    timeUnits: "m",
    timeValue: 15,
  };

  const value = isNow(start) ? end : start;

  const matches =
    _isString(value) &&
    value.match(/now(([-+])(\d+)([smhdwMy])(\/[smhdwMy])?)?/);

  if (!matches) {
    return results;
  }

  const operator = matches[2];
  const matchedTimeValue = matches[3];
  const timeUnits = matches[4] as TimeUnitId;

  if (matchedTimeValue && timeUnits && operator) {
    return {
      timeTense: operator === "+" ? NEXT : LAST,
      timeUnits,
      timeValue: parseInt(matchedTimeValue, 10),
    };
  }

  const duration = moment.duration(moment().diff(dateMath.parse(value)));
  let unitOp = "";
  for (let i = 0; i < relativeUnitsFromLargestToSmallest.length; i++) {
    const as = duration.as(relativeUnitsFromLargestToSmallest[i]);
    if (as < 0) {
      unitOp = "+";
    }
    if (Math.abs(as) > 1) {
      return {
        timeValue: Math.round(Math.abs(as)),
        timeUnits: relativeUnitsFromLargestToSmallest[i],
        timeTense: unitOp === "+" ? NEXT : LAST,
      };
    }
  }

  return results;
};
