import { Dispatch, SetStateAction } from "react";

export interface DatePickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  name: string;
}
