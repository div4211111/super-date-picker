import "react-datepicker/dist/react-datepicker.css";
import { SuperDatePicker } from "./components";
import { useState } from "react";
import {
  DurationRange,
  OnRefreshChangeProps,
  OnRefreshProps,
  OnTimeChangeProps,
  ShortDate,
} from "@shared/types";
import { DateInput } from "@components/DateInput/DateInput";
function App() {
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [start, setStart] = useState<ShortDate>("now-30m");
  const [end, setEnd] = useState<ShortDate>("now");
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = useState<number>(0);

  const onTimeChange = ({ start, end }: OnTimeChangeProps) => {
    const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
      const isDuplicate =
        recentlyUsedRange.start === start && recentlyUsedRange.end === end;
      return !isDuplicate;
    });
    recentlyUsedRange.unshift({ start, end });
    setStart(start);
    setEnd(end);
    setRecentlyUsedRanges(
      recentlyUsedRange.length > 10
        ? recentlyUsedRange.slice(0, 9)
        : recentlyUsedRange
    );
    setIsLoading(true);
    startLoading();
  };

  const onRefresh = async ({ start, end, refreshInterval }: OnRefreshProps) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    }).then(() => {
      console.log(start, end, refreshInterval);
    });
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const onRefreshChange = ({
    isPaused,
    refreshInterval,
  }: OnRefreshChangeProps) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      <div>
        <SuperDatePicker
          start={start}
          end={end}
          onTimeChange={onTimeChange}
          onRefreshChange={onRefreshChange}
          onRefresh={onRefresh}
          isLoading={isLoading}
          isPaused={isPaused}
          refreshInterval={refreshInterval}
          recentlyUsedRanges={recentlyUsedRanges}
        />
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <DateInput name={"start"} date={start} />
        <DateInput name={"end"} date={end} />
      </div>
    </div>
  );
}

export default App;
