import { Bonus } from "../../infrastructure/models/bonus";
import { Challenge } from "../../infrastructure/models/challenge";
import { ILocationPoint } from "../../infrastructure/types/ILocationPoint";
import { RouteNames } from "./route_names";

export type NavigationParamsList = {
  [RouteNames.root]: undefined;
  [RouteNames.home]: undefined;
  [RouteNames.splash]: undefined;
  [RouteNames.introduction]: undefined;
  [RouteNames.login]: undefined;
  [RouteNames.register]: undefined;
  [RouteNames.forgotPassword]: undefined;
  [RouteNames.enterNewPassword]: undefined;
  [RouteNames.trackingLocation]:
    | {
        FromLocation: ILocationPoint;
        ToLocation: ILocationPoint;
      }
    | undefined;
  [RouteNames.trackingMain]: undefined;
  [RouteNames.bonusDetails]: {
    bonus: Bonus;
  };
  [RouteNames.bonusList]: undefined;
  [RouteNames.challengeDetails]: {
    challenge: Challenge;
  };
  [RouteNames.notificationList]: undefined;
  [RouteNames.challengeCreation]: undefined;
  [RouteNames.profile]: undefined;
  [RouteNames.selectLocation]: undefined;
};
