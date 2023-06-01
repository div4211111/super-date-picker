import { Dispatch, SetStateAction } from "react";

export interface RelativeTimePickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  name: string;
}
