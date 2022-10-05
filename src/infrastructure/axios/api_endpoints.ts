export const baseURL = "https://api.test.pendlerratd.com/";

export const API_POINT = {
  getUser: "user/",
  uploadTour: "tour-transfer/user/",
  verifyTour: "/tour/{id}",
  saveLocation: "user/{user-id}/location",
  getUserRides: "tour/user/{user-id}/tours",
  getUserBounses: "bonus/user/{user-id}/bonuses",
  getUserCashedBounses: "bonus/user/{user-id}/cashed",
  redeemUserBonus: "bonus/cashed?bonus-id={bonus-id}",
  getUserStatistic: "statistic/user/{user-id}?score-type={score-type}",
  createChallenge: "challenge/",
  getUserChallengesList: "challenge/member/{user-id}",
  getChallengeInformation: "challenge/{id}",
  getUserOtherChallenges: "challenge/?activeOnly=true",
  getChallengeStatistic: "statistic/challenge/{challenge-id}",
  getNotificationUser: "notification/user",
  getDeactivateNotification: "notification/deactivate/{notification-id}",
};

export const getVerifyTourURL = (tourId: number) => {
  return API_POINT.verifyTour.replace("{id}", tourId.toString());
};

export const getSaveLocationURL = (userId: string) => {
  return API_POINT.saveLocation.replace("{user-id}", userId);
};

export const getUserRidesURL = (userId: string) => {
  return API_POINT.getUserRides.replace("{user-id}", userId);
};

export const getUserBonusesURL = (userId: string) => {
  return API_POINT.getUserBounses.replace("{user-id}", userId);
};
export const getUserCashedBonusesURL = (userId: string) => {
  return API_POINT.getUserCashedBounses.replace("{user-id}", userId);
};

export const getBonusRedeemURL = (bonusId: number) => {
  return API_POINT.redeemUserBonus.replace("{bonus-id}", bonusId.toString());
};

export const getUserStatistic = (
  userId: string,
  scoreType: "latest" | "total",
) => {
  return API_POINT.getUserStatistic
    .replace("{user-id}", userId)
    .replace("{score-type}", scoreType);
};

export const getUserChallengesListURL = (userId: string) => {
  return API_POINT.getUserChallengesList.replace("{user-id}", userId);
};
export const getChallengeInformationURL = (challengeId: number) => {
  return API_POINT.getChallengeInformation.replace(
    "{id}",
    challengeId.toString(),
  );
};

export const getUserOtherChallengesListURL = () => {
  return API_POINT.getUserOtherChallenges;
};

export const getChallengeStatisticURL = (challengeId: number) => {
  return API_POINT.getChallengeStatistic.replace(
    "{challenge-id}",
    challengeId.toString(),
  );
};

export const getDeactivateNotificationURL = (notificationId: number) => {
  return API_POINT.getDeactivateNotification.replace(
    "{notification-id}",
    notificationId.toString(),
  );
};
