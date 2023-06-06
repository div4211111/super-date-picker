import { TimeUnitId } from "./timeOptions";

export type ShortDate = NowDateMode | string;

export type AbsoluteDateMode = "absolute";
export type RelativeDateMode = "relative";
export type NowDateMode = "now";
export type DateMode = AbsoluteDateMode | RelativeDateMode | NowDateMode;
export interface QuickSelect {
  timeTense: string;
  timeValue: number;
  timeUnits: TimeUnitId;
}

export interface DurationRange {
  end: ShortDate;
  label?: string;
  start: ShortDate;
}
export interface OnTimeChangeProps extends DurationRange {
  isInvalid: boolean;
  isQuickSelection?: boolean;
}
export interface OnRefreshProps extends DurationRange {
  refreshInterval: number;
}
export type OnRefreshChangeProps = {
  isPaused: boolean;
  refreshInterval: number;
};

export type ApplyRefreshInterval = (args: OnRefreshChangeProps) => void;
