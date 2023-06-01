import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: { text: string; value: string | number }[];
}
