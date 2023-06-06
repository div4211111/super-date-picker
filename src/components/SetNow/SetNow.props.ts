import { ShortDate } from "@shared/types";
import { Dispatch, SetStateAction } from "react";

export interface SetNowProps {
  setDate: Dispatch<SetStateAction<ShortDate>>;
  type: "start" | "end";
}
