import { DateMode, ShortDate } from "@shared/types";
import { Dispatch, SetStateAction } from "react";

export interface DatesContainerProps {
  date: ShortDate;
  setDate: Dispatch<SetStateAction<ShortDate>>;
  name: string;
  type: "start" | "end";
  setDateMode: Dispatch<SetStateAction<DateMode>>;
  dateMode: DateMode;
}
