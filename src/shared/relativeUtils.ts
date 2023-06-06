import moment from "moment";
import { TimeUnitId } from "./timeOptions";
import _get from "lodash/get";
import _isString from "lodash/isString";
import dateMath from "./dateMath";

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

export function parseRelativeParts(value: string): RelativeParts {
  const matches =
    _isString(value) &&
    value.match(/now(([\-\+])([0-9]+)([smhdwMy])(\/[smhdwMy])?)?/);

  const operator = matches && matches[2];
  const count = matches && matches[3];
  const unit = matches && matches[4];
  const roundBy = matches && matches[5];

  if (count && unit) {
    const isRounded = roundBy ? true : false;
    const roundUnit =
      isRounded && roundBy
        ? (roundBy.replace(ROUND_DELIMETER, "") as TimeUnitId)
        : undefined;
    return {
      count: parseInt(count, 10),
      unit: operator === "+" ? `${unit}+` : unit,
      round: isRounded,
      ...(roundUnit ? { roundUnit } : {}),
    };
  }

  const results = { count: 0, unit: "s", round: false };
  const duration = moment.duration(moment().diff(dateMath.parse(value)));
  let unitOp = "";
  for (let i = 0; i < relativeUnitsFromLargestToSmallest.length; i++) {
    const asRelative = duration.as(relativeUnitsFromLargestToSmallest[i]);
    if (asRelative < 0) unitOp = "+";
    if (Math.abs(asRelative) > 1) {
      results.count = Math.round(Math.abs(asRelative));
      results.unit = relativeUnitsFromLargestToSmallest[i] + unitOp;
      results.round = false;
      break;
    }
  }
  return results;
}
