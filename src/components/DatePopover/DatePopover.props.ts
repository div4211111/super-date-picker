import { ShortDate } from "@shared/types";
import { Dispatch, SetStateAction } from "react";

export interface DatePopoverProps {
  date: ShortDate;
  setDate: Dispatch<SetStateAction<ShortDate>>;
  name: string;
  type: "start" | "end";
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  validState: "default" | "success" | "error";
}
