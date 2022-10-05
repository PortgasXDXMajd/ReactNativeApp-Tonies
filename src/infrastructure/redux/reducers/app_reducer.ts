import { ILocationPoint } from "../../types/ILocationPoint";
import { ActionTypes } from "../action_types";

export interface IAppActionModel {
  type: string;
  payload:
    | boolean
    | IUser
    | ILocationPoint
    | string
    | undefined
    | ILocationPoint[];
}

interface IUser {
  userId: string | null;
  firstName: string;
  lastName: string;
}

export interface IAppIntitalState {
  isLoading: boolean;
  isAuthStarted: boolean;
  isGettingData: boolean;
  isFirstVisit: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser | undefined;
  lang: string;
}

const initialState: IAppIntitalState = {
  isFirstVisit: false,
  isAuthStarted: false,
  isGettingData: false,
  isLoading: true,
  accessToken: "",
  refreshToken: "",
  user: undefined,
  lang: "",
};

const AppReducer = (
  state: IAppIntitalState = initialState,
  action: IAppActionModel,
): IAppIntitalState => {
  switch (action.type) {
    case ActionTypes.FINISHED_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.TOGGLE_GETTING_DATA:
      return {
        ...state,
        isGettingData: !state.isGettingData,
      };
    case ActionTypes.SET_FIRST_VISIT:
      return {
        ...state,
        isFirstVisit: action.payload as boolean,
      };
    case ActionTypes.SET_LANG:
      return {
        ...state,
        lang: action.payload as string,
      };

    case ActionTypes.SET_USER_ID:
      return {
        ...state,
        user: {
          userId: action.payload as string,
          firstName: state.user?.firstName as string,
          lastName: state.user?.lastName as string,
        },
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload as IUser,
      };
    case ActionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload as string,
      };
    case ActionTypes.SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload as string,
      };

    case ActionTypes.AUTH_LOADING_TOGGLE:
      return {
        ...state,
        isAuthStarted: !state.isAuthStarted,
      };
    case ActionTypes.LOGOUT:
      return {
        isFirstVisit: false,
        isAuthStarted: false,
        isGettingData: false,
        isLoading: false,
        accessToken: "",
        refreshToken: "",
        user: undefined,
        lang: "",
      };

    default:
      return state;
  }
};

export { AppReducer };
