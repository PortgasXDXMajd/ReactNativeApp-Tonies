import * as React from "react";
import Geolocation from "react-native-geolocation-service";
import BackgroundGeolocation from "react-native-background-geolocation";
import { getDistance } from "geolib";
import { Alert } from "react-native";
import { RouteNames } from "../../components/navigation/route_names";
import { refreshAuthentication } from "../auth/authentication";
import { TrackingController } from "../axios/tracking_controller";
import { createGpxFile } from "../google_map/gpx_helper";
import {
  checkUserLocation,
  requestGeolocationPermission,
} from "../google_map/map_helper";
import { ActionTypes } from "../redux/action_types";
import { IAppIntitalState } from "../redux/reducers/app_reducer";
import { showToast, ToastType } from "../toast/toast_helper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamsList } from "../../components/navigation/navigation_param_list";
import { LocationController } from "../axios/location_controller";
import { ILocationPoint } from "../types/ILocationPoint";
import { UserPossibleLocation } from "../enums/UserPossibleLocation";
import { ITrackerIntitalState } from "../redux/reducers/tracking_reducer";

export enum GeoFenceActionNames {
  enter = "ENTER",
  exit = "EXIT",
}
export class TrackHelper {
  private static userStartLocation: UserPossibleLocation =
    UserPossibleLocation.NEITHER;
  private static isTheStartOfTracking: boolean = true;

  public static getLocationPreview = async (
    myDispatch: React.Dispatch<unknown>,
    tracker: ITrackerIntitalState,
    homeLocation: ILocationPoint | undefined,
    workLocation: ILocationPoint | undefined,
  ): Promise<void> => {
    const userPossibleLocation = await checkUserLocation({
      userLocation: tracker.userLocation,
      homeLocation:
        homeLocation !== undefined ? homeLocation : tracker.homeLocation,
      officeLocation:
        workLocation !== undefined ? workLocation : tracker.workLocation,
    });
    myDispatch({
      type: ActionTypes.UPDATE_LOCATION_PREVIEW,
      payload: userPossibleLocation,
    });
  };

  public static getCurrentLocation = (
    myDispatch: React.Dispatch<unknown>,
  ): void => {
    requestGeolocationPermission();
    Geolocation.getCurrentPosition(
      (position) => {
        myDispatch({
          type: ActionTypes.SET_USER_LOCATION,
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
      },
    );
  };

  public static startTracking = async (
    myDispatch: React.Dispatch<unknown>,
    tracker: ITrackerIntitalState,
    app: IAppIntitalState,
    navigation: NativeStackNavigationProp<
      NavigationParamsList,
      RouteNames.trackingMain
    >,
  ): Promise<void> => {
    myDispatch({
      type: ActionTypes.START_TRACKING,
    });
    myDispatch({
      type: ActionTypes.START_STOPWATCH,
    });

    await BackgroundGeolocation.ready({
      // notification persist
      notification: {
        title: "PendlerRatD",
        text: "Streckenaufzeichnung",
        channelName: "PendlerRatD",
        smallIcon: "drawable/ic_stat_onesignal_default",
      },
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 15,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: true,
      startOnBoot: false,
    });

    if (
      tracker.homeLocation !== undefined &&
      tracker.workLocation !== undefined
    ) {
      BackgroundGeolocation.addGeofences([
        {
          identifier: UserPossibleLocation.HOME,
          radius: 200,
          latitude: tracker.homeLocation.latitude,
          longitude: tracker.homeLocation.longitude,
          notifyOnEntry: true,
        },
        {
          identifier: UserPossibleLocation.OFFICE,
          radius: 200,
          latitude: tracker.workLocation.latitude,
          longitude: tracker.workLocation.longitude,
          notifyOnEntry: true,
        },
      ]);
    }

    await BackgroundGeolocation.start();

    await TrackHelper.getLocationPreview(
      myDispatch,
      tracker,
      undefined,
      undefined,
    );
    await BackgroundGeolocation.changePace(true);
    let isFirstValue = true;

    BackgroundGeolocation.onLocation((loc) => {
      if (isFirstValue) {
        isFirstValue = false;
        return;
      }

      const elevation =
        loc.coords.altitude === 0 ? Math.random() : loc.coords.altitude;

      myDispatch({
        type: ActionTypes.SET_USER_LOCATION,
        payload: {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          elevation,
          time: Date.parse(loc.timestamp),
        },
      });
      myDispatch({
        type: ActionTypes.ADD_COORDINATE,
        payload: {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          elevation,
          time: loc.timestamp,
        },
      });

      if (tracker.trackedCoordinates.size > 1) {
        const beforeLast = [...tracker.trackedCoordinates][
          tracker.trackedCoordinates.size - 2
        ];
        const last = [...tracker.trackedCoordinates][
          tracker.trackedCoordinates.size - 1
        ];
        myDispatch({
          type: ActionTypes.ADD_DISTANCE,
          payload: getDistance(beforeLast, last),
        });
      }
    });

    if (
      tracker.homeLocation !== undefined &&
      tracker.workLocation !== undefined
    ) {
      BackgroundGeolocation.onGeofence(async (geofence) => {
        if (this.isTheStartOfTracking) {
          this.userStartLocation = await checkUserLocation({
            userLocation: tracker.userLocation,
            homeLocation: tracker.homeLocation,
            officeLocation: tracker.workLocation,
          });
          this.isTheStartOfTracking = false;
        } else {
          if (this.userStartLocation === UserPossibleLocation.HOME) {
            if (
              geofence.identifier === UserPossibleLocation.OFFICE &&
              geofence.action === GeoFenceActionNames.enter
            ) {
              this.stopTracking(myDispatch, tracker, navigation, false);
              this.uploadTripToServer(myDispatch, tracker, app);
            }
          }
          if (this.userStartLocation === UserPossibleLocation.OFFICE) {
            if (
              geofence.identifier === UserPossibleLocation.HOME &&
              geofence.action === GeoFenceActionNames.enter
            ) {
              this.stopTracking(myDispatch, tracker, navigation, false);
              this.uploadTripToServer(myDispatch, tracker, app);
            }
          }
        }
      });
    }
  };

  public static stopTracking = async (
    myDispatch: React.Dispatch<unknown>,
    tracker: ITrackerIntitalState,
    navigation: NativeStackNavigationProp<
      NavigationParamsList,
      RouteNames.trackingMain
    >,
    isLocationOverwriteIsSelected: boolean,
  ): Promise<void> => {
    myDispatch({
      type: ActionTypes.SET_IS_TRACKING_STOPPED,
      payload: true,
    });

    myDispatch({
      type: ActionTypes.SET_IS_TRACKING_ENABLED,
      payload: false,
    });

    BackgroundGeolocation.removeGeofences();
    BackgroundGeolocation.stop();
    BackgroundGeolocation.removeAllListeners();

    if (isLocationOverwriteIsSelected) {
      const [from] = tracker.trackedCoordinates;
      const to = [...tracker.trackedCoordinates][
        tracker.trackedCoordinates.size - 1
      ];
      if (from !== undefined && to !== undefined) {
        navigation.navigate(RouteNames.trackingLocation, {
          FromLocation: from,
          ToLocation: to,
        });
      } else {
        showToast(ToastType.info, "You did not move correctly", " ");
      }
    }

    if (
      tracker.homeLocation === undefined ||
      tracker.workLocation === undefined
    ) {
      const [from] = tracker.trackedCoordinates;
      const to = [...tracker.trackedCoordinates][
        tracker.trackedCoordinates.size - 1
      ];
      navigation.navigate(RouteNames.trackingLocation, {
        FromLocation: from,
        ToLocation: to,
      });
    }
  };

  public static uploadTripToServer = async (
    myDispatch: React.Dispatch<unknown>,
    tracker: ITrackerIntitalState,
    app: IAppIntitalState,
  ): Promise<void> => {
    const gpx = await createGpxFile(
      Array.from(tracker.trackedCoordinates.values()),
    );

    await refreshAuthentication(app.refreshToken)
      .then(async (res) => {
        if (res.result) {
          myDispatch({
            type: ActionTypes.SET_ACCESS_TOKEN,
            payload: res.accToken,
          });
          myDispatch({
            type: ActionTypes.SET_REFRESH_TOKEN,
            payload: res.refToken,
          });

          const trackingController = new TrackingController(res.accToken);
          const uploadRes = await trackingController.uploadTour(
            app.user?.userId as string,
            gpx,
          );
          if (uploadRes) {
            myDispatch({
              type: ActionTypes.TOGGLE_UPLOAD_TRIP,
            });
            this.discardTrip(myDispatch);
          }
        } else {
          showToast(ToastType.error, "Error", "Could not refresh");
          return;
        }
      })
      .catch((error) => {
        showToast(ToastType.error, "Error", error);
        return;
      });
  };

  public static discardTrip = (myDispatch: React.Dispatch<unknown>): void => {
    myDispatch({
      type: ActionTypes.SET_IS_TRACKING_STOPPED,
      payload: false,
    });
    myDispatch({
      type: ActionTypes.DISCARD_TRIP,
    });
    TrackHelper.getCurrentLocation(myDispatch);
  };

  public static saveLocation = async (
    myDispatch: React.Dispatch<unknown>,
    app: IAppIntitalState,
    homeLocation: ILocationPoint,
    workLocation: ILocationPoint,
  ): Promise<void> => {
    await refreshAuthentication(app.refreshToken)
      .then((res) => {
        if (res.result) {
          myDispatch({
            type: ActionTypes.SET_ACCESS_TOKEN,
            payload: res.accToken,
          });
          myDispatch({
            type: ActionTypes.SET_REFRESH_TOKEN,
            payload: res.refToken,
          });
        } else {
          showToast(ToastType.error, "Error", "Could not refresh");
          return;
        }
      })
      .catch((error) => {
        showToast(ToastType.error, "Error", error);
        return;
      });

    const locationController = new LocationController(app.accessToken);
    await locationController
      .saveUserLocations(app.user?.userId as string, homeLocation, workLocation)
      .then(() => {
        return;
      })
      .catch((error) => {
        showToast(ToastType.error, "something went wrong", `${error}`);
      });
  };
}
