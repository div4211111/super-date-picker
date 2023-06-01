import { Dispatch, SetStateAction } from "react";

export interface SetNowProps {
  setIsNow: Dispatch<SetStateAction<boolean>>;
  type: "start" | "end";
}
