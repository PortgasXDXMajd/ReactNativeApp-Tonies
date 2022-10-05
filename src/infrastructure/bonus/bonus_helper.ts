import { Bonus } from "../models/bonus";
import { Statistic } from "../models/statistic";

export const checkIfUserHaveEnoughCreditToRedeemBonus = (
  bonus: Bonus,
  userLatestStatistic: Statistic,
): boolean => {
  if (userLatestStatistic !== undefined) {
    if (bonus.bonusAmountLeft <= 0) {
      return false;
    } else if (
      userLatestStatistic?.statistiAltitude >= bonus.bonusAltitude &&
      userLatestStatistic?.statistiTours >= bonus.bonusTourCount &&
      userLatestStatistic?.statisticDistance >= bonus.bonusDistance
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
