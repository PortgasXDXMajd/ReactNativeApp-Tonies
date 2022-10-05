import BigNumber from "bignumber.js";
import { strings } from "../language/i18n";

const numberFormatter = {
  prefix: "",
  decimalSeparator: strings.NumberDecimalSeprater,
  groupSeparator: strings.NumberGroupSeprater,
  groupSize: 3,
  secondaryGroupSize: 2,
};

export const formatNumber = (x: number): string => {
  return new BigNumber(x.toFixed(1)).toFormat(numberFormatter);
};
