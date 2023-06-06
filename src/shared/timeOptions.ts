import _isString from "lodash/isString";
import { DurationRange } from "./types";

export const LAST = "last";
export const NEXT = "next";
export interface RelativeOption {
  text: string;
  value: TimeUnitAllId;
}
export type TimeUnitId = "s" | "m" | "h" | "d" | "w" | "M" | "y";
export type TimeUnitFromNowId = "s+" | "m+" | "h+" | "d+" | "w+" | "M+" | "y+";
export type TimeUnitAllId = TimeUnitId | TimeUnitFromNowId;
export const timeTenseOptions = [
  { value: LAST, text: "Last" },
  { value: NEXT, text: "Next" },
];

export const timeUnitsOptions = [
  { value: "s", text: "Seconds" },
  { value: "m", text: "Minutes" },
  { value: "h", text: "Hours" },
  { value: "d", text: "Days" },
  { value: "w", text: "Weeks" },
  { value: "M", text: "Months" },
  { value: "y", text: "Years" },
];

export const relativeOptions: RelativeOption[] = [
  {
    text: "Seconds ago",
    value: "s",
  },
  {
    text: "Minutes ago",
    value: "m",
  },
  {
    text: "Hours ago",
    value: "h",
  },
  {
    text: "Days ago",
    value: "d",
  },
  {
    text: "Weeks ago",
    value: "w",
  },
  {
    text: "Months ago",
    value: "M",
  },
  {
    text: "Years ago",
    value: "y",
  },
  {
    text: "Seconds from now",
    value: "s+",
  },
  {
    text: "Minutes from now",
    value: "m+",
  },
  {
    text: "Hours from now",
    value: "h+",
  },
  {
    text: "Days from now",
    value: "d+",
  },
  {
    text: "Weeks from now",
    value: "w+",
  },
  {
    text: "Months from now",
    value: "M+",
  },
  {
    text: "Years from now",
    value: "y+",
  },
];

export const relativeRoundingLabels = {
  s: "Round to the second",
  m: "Round to the minute",
  h: "Round to the hour",
  d: "Round to the day",
  w: "Round to the week",
  M: "Round to the month",
  y: "Round to the year",
};

export const commonDurationRanges: DurationRange[] = [
  {
    start: "now/d",
    end: "now/d",
    label: "Today",
  },
  {
    start: "now/w",
    end: "now/w",
    label: "This week",
  },
  {
    start: "now/M",
    end: "now/M",
    label: "This month",
  },
  {
    start: "now/y",
    end: "now/y",
    label: "This year",
  },
  {
    start: "now-1d/d",
    end: "now-1d/d",
    label: "Yesterday",
  },
  {
    start: "now/w",
    end: "now",
    label: "Week to date",
  },
  {
    start: "now/M",
    end: "now",
    label: "Month to date",
  },
  {
    start: "now/y",
    end: "now",
    label: "Year to date",
  },
];
export const intervalOptions = [
  {
    text: "seconds",
    value: "seconds",
  },
  {
    text: "minutes",
    value: "minutes",
  },
  {
    text: "hours",
    value: "hours",
  },
];
export const millisecondsToTime = (
  milliseconds: number,
  unit: "seconds" | "minutes" | "hours"
): number => {
  switch (unit) {
    case "seconds":
      return milliseconds / 1000;
    case "minutes":
      return milliseconds / (1000 * 60);
    case "hours":
      return milliseconds / (1000 * 60 * 60);
  }
};

export const timeToMilliseconds = (
  value: number,
  unit: "seconds" | "minutes" | "hours"
): number => {
  switch (unit) {
    case "seconds":
      return value * 1000;
    case "minutes":
      return value * 1000 * 60;
    case "hours":
      return value * 1000 * 60 * 60;
  }
};
