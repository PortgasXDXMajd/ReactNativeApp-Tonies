import * as React from "react";
import { Linking } from "react-native";
import { authenticateUser, refreshAuthentication } from "./authentication";
import { UserController } from "../axios/user_controller";
import { ActionTypes } from "../redux/action_types";
import { getData } from "../storage/storage_helper";
import { storageKeys } from "../storage/storage_keys";
import { showToast, ToastType } from "../toast/toast_helper";
import { LocationController } from "../axios/location_controller";
import {
  deleteTokens,
  getDataSecurly,
  RNS_Keys,
} from "../secure_storage/rns_info";

const registrationURL =
  "https://auth.test.pendlerratd.com/auth/realms/PendlerRatD_Test/protocol/openid-connect/registrations?client_id=prd-native-app&response_type=code&scope=openid,email&redirect_uri=com.pendlerratd://auth/callback&kc_locale=de";

export class AuthHelper {
  public static async getUserInfo(
    accessToken: string,
    refreshToken: string,
    myDispatch: React.Dispatch<unknown>,
  ) {
    const isFirstTime = await getData(storageKeys.isFirstTimeKey);
    const userController = new UserController(accessToken);
    const userId = await userController.getUserId();

    myDispatch({
      type: ActionTypes.SET_FIRST_VISIT,
      payload: !isFirstTime.result,
    });

    const userInfo = await userController.getUserInfo(userId);

    myDispatch({
      type: ActionTypes.SET_USER,
      payload: {
        userId: userId,
        firstName: userInfo.firstname,
        lastName: userInfo.lastname,
      },
    });

    const locationController = new LocationController(accessToken);
    await locationController.getUserHomeWorkLocations(userId, myDispatch);
    showToast(ToastType.success, "Successful login", " ");
  }
  public static async login(myDispatch: React.Dispatch<unknown>) {
    const res = await authenticateUser();
    if (res.result && res.data != undefined) {
      myDispatch({
        type: ActionTypes.SET_ACCESS_TOKEN,
        payload: res.data.accessToken,
      });
      myDispatch({
        type: ActionTypes.SET_REFRESH_TOKEN,
        payload: res.data.refreshToken,
      });
      AuthHelper.getUserInfo(
        res.data.accessToken,
        res.data.refreshToken,
        myDispatch,
      );
    } else {
      showToast(ToastType.error, "Login Error", res.message);
    }
  }
  public static async register() {
    const supported = await Linking.canOpenURL(registrationURL);
    if (supported) {
      await Linking.openURL(registrationURL);
    }
  }
  public static async checkForAccessToken(
    myDispatch: React.Dispatch<unknown>,
  ): Promise<void> {
    const isFirstTime = await getData(storageKeys.isFirstTimeKey);
    myDispatch({
      type: ActionTypes.SET_FIRST_VISIT,
      payload: !isFirstTime.result,
    });

    if (!isFirstTime.result) {
      setTimeout(() => {
        myDispatch({
          type: ActionTypes.FINISHED_LOADING,
        });
        return;
      }, 2000);
    }

    const resAccessToken = await getDataSecurly(RNS_Keys.AccessToken);
    const resRefrechToken = await getDataSecurly(RNS_Keys.RefreshToken);

    if (resAccessToken.result && resRefrechToken.result) {
      const res = await refreshAuthentication(resRefrechToken.data);
      if (res.result) {
        resAccessToken.data = res.accToken;
        resRefrechToken.data = res.refToken;
      } else {
        myDispatch({
          type: ActionTypes.FINISHED_LOADING,
        });
      }

      const userController = new UserController(resAccessToken.data);

      myDispatch({
        type: ActionTypes.SET_ACCESS_TOKEN,
        payload: resAccessToken.data,
      });

      myDispatch({
        type: ActionTypes.SET_REFRESH_TOKEN,
        payload: resRefrechToken.data,
      });

      const userId = await userController.getUserId();
      const userInfo = await userController.getUserInfo(userId);

      myDispatch({
        type: ActionTypes.SET_USER,
        payload: {
          userId: userId,
          firstName: userInfo.firstname,
          lastName: userInfo.lastname,
        },
      });

      const locationController = new LocationController(
        resAccessToken.data as string,
      );
      await locationController.getUserHomeWorkLocations(userId, myDispatch);

      myDispatch({
        type: ActionTypes.FINISHED_LOADING,
      });
    } else {
      setTimeout(() => {
        myDispatch({
          type: ActionTypes.FINISHED_LOADING,
        });
      }, 1000);
    }
  }
  public static async checkIsFirstTime(
    myDispatch: React.Dispatch<unknown>,
  ): Promise<boolean> {
    const isFirstTime = await getData(storageKeys.isFirstTimeKey);
    myDispatch({
      type: ActionTypes.SET_FIRST_VISIT,
      payload: !isFirstTime.result,
    });
    return !isFirstTime.result;
  }
  public static logout(myDispatch: React.Dispatch<unknown>) {
    myDispatch({
      type: ActionTypes.LOGOUT,
    });
    deleteTokens();
  }
}
