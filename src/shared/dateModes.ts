import moment from "moment";
import {
  AbsoluteDateMode,
  DateMode,
  NowDateMode,
  RelativeDateMode,
  ShortDate,
} from "./types";
import dateMath from "./dateMath";
import { parseRelativeParts, toRelativeStringFromParts } from "./relativeUtils";

export const DATE_MODES: {
  ABSOLUTE: AbsoluteDateMode;
  RELATIVE: RelativeDateMode;
  NOW: NowDateMode;
} = {
  ABSOLUTE: "absolute",
  RELATIVE: "relative",
  NOW: "now",
};

export const INVALID_DATE = "invalid_date";

export function getDateMode(value: ShortDate): DateMode {
  if (value === "now") {
    return DATE_MODES.NOW;
  }

  if (value.includes("now")) {
    return DATE_MODES.RELATIVE;
  }

  return DATE_MODES.ABSOLUTE;
}

export function toAbsoluteString(value: string, roundUp = false) {
  const valueAsMoment = dateMath.parse(value, { roundUp });
  if (!valueAsMoment) {
    return value;
  }
  if (!moment(valueAsMoment).isValid()) {
    return INVALID_DATE;
  }
  return valueAsMoment.toISOString();
}

export function toRelativeString(value: string) {
  return toRelativeStringFromParts(parseRelativeParts(value));
}
export function getDate(value: ShortDate) {
  const mode = getDateMode(value);
  if (mode === DATE_MODES.NOW) {
    return value;
  }
  if (mode === DATE_MODES.ABSOLUTE) {
    return toRelativeString(value);
  }
  if (mode === DATE_MODES.RELATIVE) {
    return value;
  }
  return INVALID_DATE;
}
