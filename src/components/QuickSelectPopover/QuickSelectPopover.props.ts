import {
  ApplyRefreshInterval,
  DurationRange,
  OnRefreshProps,
  OnTimeChangeProps,
  ShortDate,
} from "@shared/types";
import { Dispatch, SetStateAction } from "react";

export interface QuickSelectPopoverProps {
  onTimeChange: (props: OnTimeChangeProps) => void;
  recentlyUsedRanges?: DurationRange[];
  refreshInterval?: number;
  start: ShortDate;
  end: ShortDate;
  isInvalid: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onRefresh?: (props: OnRefreshProps) => void;
  onRefreshChange?: ApplyRefreshInterval;
  setTimeStart: Dispatch<SetStateAction<ShortDate>>;
  setTimeEnd: Dispatch<SetStateAction<ShortDate>>;
}
