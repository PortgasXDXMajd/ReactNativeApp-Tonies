import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IGetRide } from "../models/ride";
import { showToast, ToastType } from "../toast/toast_helper";
import { baseURL, getUserRidesURL } from "./api_endpoints";

export class RidesController {
  private accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async getUserRides(userId: string): Promise<IGetRide[] | undefined> {
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
      const result: AxiosResponse = await service.get(getUserRidesURL(userId));

      if (result !== null) {
        if (result.status === 200) {
          return result.data as IGetRide[];
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
}
