import { ShortDate } from "@shared/types";
import { Dispatch, SetStateAction } from "react";

export interface DatePickerProps {
  date: ShortDate;
  setDate: Dispatch<SetStateAction<ShortDate>>;
  name: string;
}
