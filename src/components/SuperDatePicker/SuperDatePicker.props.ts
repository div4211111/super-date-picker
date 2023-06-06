import {
  ApplyRefreshInterval,
  DurationRange,
  OnRefreshProps,
  OnTimeChangeProps,
  ShortDate,
} from "@shared/types";

export interface SuperDatePickerProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  isPaused?: boolean;
  onRefresh?: (props: OnRefreshProps) => void;
  onRefreshChange?: ApplyRefreshInterval;
  onTimeChange: (props: OnTimeChangeProps) => void;
  recentlyUsedRanges?: DurationRange[];
  refreshInterval?: number;
  start?: ShortDate;
  end?: ShortDate;
}
