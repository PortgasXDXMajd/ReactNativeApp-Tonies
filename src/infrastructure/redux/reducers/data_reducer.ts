import { Bonus } from "../../models/bonus";
import { CashedBonus } from "../../models/cashed_bonus";
import { Challenge } from "../../models/challenge";
import { Notification } from "../../models/notification";
import { Ride } from "../../models/ride";
import { Statistic } from "../../models/statistic";
import { ActionTypes } from "../action_types";

export interface IAppActionModel {
  type: string;
  payload:
    | Ride[]
    | Bonus[]
    | CashedBonus[]
    | Statistic
    | Challenge[]
    | Notification[];
}

export interface IDataIntitalState {
  userRides: Ride[];
  userBonuses: Bonus[];
  userLockedBonuses: Bonus[];
  userObtainableBonuses: Bonus[];
  userCashedBonuses: CashedBonus[];
  userTotalStatistic: Statistic | undefined;
  userLatestStatistic: Statistic | undefined;
  userChallengesList: Challenge[];
  userOtherChallengesList: Challenge[];
  userNotification: Notification[];
  dataLoaded: boolean;
}

const initialState: IDataIntitalState = {
  userRides: [],
  userBonuses: [],
  userLockedBonuses: [],
  userObtainableBonuses: [],
  userCashedBonuses: [],
  userTotalStatistic: undefined,
  userLatestStatistic: undefined,
  userChallengesList: [],
  userOtherChallengesList: [],
  userNotification: [],
  dataLoaded: false,
};

const DataReducer = (
  state: IDataIntitalState = initialState,
  action: IAppActionModel,
): IDataIntitalState => {
  switch (action.type) {
    case ActionTypes.SET_RIDE_LIST:
      return {
        ...state,
        userRides: action.payload as Ride[],
      };
    case ActionTypes.SET_BONUS_LIST:
      return {
        ...state,
        userBonuses: action.payload as Bonus[],
      };
    case ActionTypes.SET_OBTAINABLE_BONUS_LIST:
      return {
        ...state,
        userObtainableBonuses: action.payload as Bonus[],
      };
    case ActionTypes.SET_LOCKED_BONUS_LIST:
      return {
        ...state,
        userLockedBonuses: action.payload as Bonus[],
      };
    case ActionTypes.SET_CASHED_BONUS_LIST:
      return {
        ...state,
        userCashedBonuses: action.payload as CashedBonus[],
      };
    case ActionTypes.SET_TOTAL_STATISTIC:
      return {
        ...state,
        userTotalStatistic: action.payload as Statistic,
      };
    case ActionTypes.SET_LATEST_STATISTIC:
      return {
        ...state,
        userLatestStatistic: action.payload as Statistic,
      };
    case ActionTypes.SET_CHALLENGES_LIST:
      return {
        ...state,
        userChallengesList: action.payload as Challenge[],
      };
    case ActionTypes.SET_OTHER_CHALLENGES_LIST:
      return {
        ...state,
        userOtherChallengesList: action.payload as Challenge[],
      };

    case ActionTypes.SET_NOTIFICATION_LIST:
      return {
        ...state,
        userNotification: action.payload as Notification[],
      };

    case ActionTypes.SET_DATA_LOADED:
      return {
        ...state,
        dataLoaded: true,
      };
    default:
      return state;
  }
};

export { DataReducer };
