import { TimeUnitId } from "./timeOptions";
import _get from "lodash/get";

export const relativeUnitsFromLargestToSmallest: TimeUnitId[] = [
  "y",
  "M",
  "w",
  "d",
  "h",
  "m",
  "s",
];

const ROUND_DELIMETER = "/";
export interface RelativeParts {
  count: number;
  round: boolean;
  roundUnit?: TimeUnitId;
  unit: string;
}

export const toRelativeStringFromParts = (relativeParts: RelativeParts) => {
  const count = _get(relativeParts, "count", 0);
  const isRounded = _get(relativeParts, "round", false);

  if (count === 0 && !isRounded) {
    return "now";
  }

  const matches = _get(relativeParts, "unit", "s").match(/([smhdwMy])(\+)?/);
  const unit = matches && matches[1];
  const operator = matches && matches[2] ? matches[2] : "-";
  const round = isRounded ? `${ROUND_DELIMETER}${unit}` : "";

  return `now${operator}${count}${unit}${round}`;
};
