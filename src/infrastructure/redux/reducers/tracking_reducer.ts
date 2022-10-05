import Stopwatch from "@tsdotnet/stopwatch";
import { UserPossibleLocation } from "../../enums/UserPossibleLocation";
import { ILocationPoint } from "../../types/ILocationPoint";
import { ITrackerActionModel } from "../../types/ITrackerActionModel";
import { ActionTypes } from "../action_types";

export interface ITrackerIntitalState {
  isTrackingEnabled: boolean;
  isTrackingStopped: boolean;
  wasRideUploadedSuccessfully: boolean;
  stopwatch: Stopwatch | undefined;
  rideDuration: number;
  rideDistance: number;
  userLocation: ILocationPoint | undefined;
  homeLocation: ILocationPoint | undefined;
  workLocation: ILocationPoint | undefined;
  userLocationPreview: UserPossibleLocation;
  trackedCoordinates: Set<ILocationPoint>;
}

const initialState: ITrackerIntitalState = {
  isTrackingEnabled: false,
  isTrackingStopped: false,
  wasRideUploadedSuccessfully: false,
  stopwatch: undefined,
  rideDistance: 0,
  rideDuration: 0,
  userLocation: {
    latitude: 0,
    longitude: 0,
    elevation: 0,
    time: new Date(),
  },
  homeLocation: undefined,
  workLocation: undefined,
  userLocationPreview: UserPossibleLocation.NEITHER,
  trackedCoordinates: new Set(),
};

const TrackingReducer = (
  state: ITrackerIntitalState = initialState,
  action: ITrackerActionModel,
): ITrackerIntitalState => {
  switch (action.type) {
    //used
    case ActionTypes.START_STOPWATCH:
      return {
        ...state,
        stopwatch: Stopwatch.startNew(),
        rideDuration: 0,
      };
    //used
    case ActionTypes.SET_RIDE_DURATION:
      return {
        ...state,
        rideDuration:
          state.stopwatch !== undefined
            ? state.stopwatch?.elapsedMilliseconds / 1000 / 60
            : 0,
      };
    //used
    case ActionTypes.SET_IS_TRACKING_ENABLED:
      return {
        ...state,
        isTrackingEnabled: action.payload as boolean,
      };
    //used
    case ActionTypes.SET_IS_TRACKING_STOPPED:
      return {
        ...state,
        isTrackingStopped: action.payload as boolean,
      };
    case ActionTypes.TOGGLE_UPLOAD_TRIP:
      return {
        ...state,
        wasRideUploadedSuccessfully: !state.wasRideUploadedSuccessfully,
      };
    //used
    case ActionTypes.START_TRACKING:
      return {
        ...state,
        isTrackingEnabled: true,
        rideDistance: 0,
        rideDuration: 0,
      };
    case ActionTypes.UPDATE_LOCATION_PREVIEW:
      return {
        ...state,
        userLocationPreview: action.payload as UserPossibleLocation,
      };
    //used
    case ActionTypes.ADD_DISTANCE:
      return {
        ...state,
        rideDistance: state.rideDistance + (action.payload as number),
      };
    case ActionTypes.RESET:
      return {
        ...state,
        rideDistance: 0,
        rideDuration: 0,
      };
    case ActionTypes.SET_HOME_LOCATION:
      return {
        ...state,
        homeLocation: action.payload as ILocationPoint,
      };
    case ActionTypes.SET_WORK_LOCATION:
      return {
        ...state,
        workLocation: action.payload as ILocationPoint,
      };
    //used
    case ActionTypes.SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload as ILocationPoint,
      };
    //used
    case ActionTypes.ADD_COORDINATE:
      return {
        ...state,
        trackedCoordinates: state.trackedCoordinates.add(
          action.payload as ILocationPoint,
        ),
      };
    case ActionTypes.RESET_COORDINATES:
      state.trackedCoordinates.clear();
      return {
        ...state,
      };
    case ActionTypes.DISCARD_TRIP:
      state.trackedCoordinates.clear();
      return {
        ...state,
        rideDistance: 0,
        rideDuration: 0,
        stopwatch: undefined,
      };
    default:
      return state;
  }
};

export { TrackingReducer };
