import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IGetNotification } from "../models/notification";
import { showToast, ToastType } from "../toast/toast_helper";
import {
  API_POINT,
  baseURL,
  getDeactivateNotificationURL,
} from "./api_endpoints";

export class NotificationController {
  private accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async getUserNotification(): Promise<IGetNotification[] | undefined> {
    const AuthToken: string = "Bearer " + this.accessToken;

    const myHeaders: {
      Authorization: string;
      Accept: string;
    } = {
      Authorization: AuthToken,
      Accept: "application/json",
    };

    const service: AxiosInstance = axios.create({
      baseURL: baseURL,
      headers: myHeaders,
    });

    try {
      const result: AxiosResponse = await service.get(
        API_POINT.getNotificationUser,
      );

      if (result !== null) {
        if (result.status === 200) {
          return result.data as IGetNotification[];
        } else {
          showToast(ToastType.error, "Error", result.status.toString());
          return;
        }
      } else {
        showToast(ToastType.error, "Error", "Network Error");
        return;
      }
    } catch (error) {
      showToast(ToastType.error, "Error", "Somthing went wrong");
      return;
    }
  }
  public async deactivateNotification(
    noitificationId: number,
  ): Promise<boolean | undefined> {
    const AuthToken: string = "Bearer " + this.accessToken;

    const myHeaders: {
      Authorization: string;
      Accept: string;
    } = {
      Authorization: AuthToken,
      Accept: "application/json",
    };

    const service: AxiosInstance = axios.create({
      baseURL: baseURL,
      headers: myHeaders,
    });

    try {
      const result: AxiosResponse = await service.post(
        getDeactivateNotificationURL(noitificationId),
      );

      if (result !== null) {
        if (result.status === 200) {
          showToast(ToastType.success, "Notification got deactivated", " ");
          return true;
        } else {
          showToast(
            ToastType.error,
            "Error",
            "We couldn't devativate the notification",
          );
          return;
        }
      } else {
        showToast(ToastType.error, "Error", "Network Error");
        return;
      }
    } catch (error) {
      showToast(ToastType.error, "Error", "Somthing went wrong");
      return;
    }
  }
}
