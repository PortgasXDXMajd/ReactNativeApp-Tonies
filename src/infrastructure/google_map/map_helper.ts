import { getPreciseDistance } from "geolib";
import { PermissionsAndroid, Platform } from "react-native";
import BackgroundGeolocation from "react-native-background-geolocation";
import Geolocation from "@react-native-community/geolocation";
import { ITrackerIntitalState } from "../redux/reducers/tracking_reducer";
import { ILocationPoint } from "../types/ILocationPoint";
import { UserPossibleLocation } from "../enums/UserPossibleLocation";

export const API_KEY = "AIzaSyC25gX1CLrpk32mgTE1CelXWhvuuon4uog";

interface ICheckUserLocation {
  userLocation: ILocationPoint | undefined;
  homeLocation: ILocationPoint | undefined;
  officeLocation: ILocationPoint | undefined;
}

export const requestGeolocationPermission = async (): Promise<void> => {
  if (Platform.OS === "android") {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  } else {
    Geolocation.requestAuthorization();
  }
};

export const checkUserLocation = async (
  props: ICheckUserLocation,
): Promise<UserPossibleLocation> => {
  if (
    props.homeLocation !== undefined &&
    props.officeLocation !== undefined &&
    props.userLocation !== undefined
  ) {
    const homeDistance = getPreciseDistance(
      props.userLocation,
      props.homeLocation,
    );

    if (homeDistance <= 700) {
      return UserPossibleLocation.HOME;
    }

    const workDistance = await getPreciseDistance(
      props?.userLocation,
      props?.homeLocation,
    );

    if (workDistance <= 700) {
      return UserPossibleLocation.OFFICE;
    }
  }

  return UserPossibleLocation.NEITHER;
};

export const checkRideDistination = (
  homeLocation: ILocationPoint,
  startLocation: ILocationPoint,
  endLocation: ILocationPoint,
): UserPossibleLocation => {
  if (
    startLocation != undefined &&
    endLocation != undefined &&
    homeLocation != undefined
  ) {
    const DistanceFromStart = getPreciseDistance(startLocation, homeLocation);

    if (DistanceFromStart <= 100) {
      return UserPossibleLocation.HOME;
    }

    const DistanceFromEnd = getPreciseDistance(endLocation, homeLocation);

    if (DistanceFromEnd <= 100) {
      return UserPossibleLocation.OFFICE;
    }
  }

  return UserPossibleLocation.NEITHER;
};

export const startBackgroundTracking = async (
  locations: ITrackerIntitalState,
) => {
  await BackgroundGeolocation.ready({
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION,
    distanceFilter: 10,
    stopTimeout: 5,
    debug: false,
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    stopOnTerminate: true,
    startOnBoot: false,
  });

  await BackgroundGeolocation.changePace(true);

  await BackgroundGeolocation.start();

  if (
    locations.homeLocation !== undefined &&
    locations.workLocation !== undefined
  ) {
    BackgroundGeolocation.addGeofences([
      {
        identifier: UserPossibleLocation.HOME,
        radius: 200,
        latitude: locations.homeLocation.latitude,
        longitude: locations.homeLocation.longitude,
        notifyOnEntry: true,
      },
      {
        identifier: UserPossibleLocation.OFFICE,
        radius: 200,
        latitude: locations.workLocation.latitude,
        longitude: locations.workLocation.longitude,
        notifyOnEntry: true,
      },
    ]);
  }
};
