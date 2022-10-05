import axios, { AxiosResponse } from "axios";
import { IGetStatistic } from "../models/statistic";
import { showToast, ToastType } from "../toast/toast_helper";
import { baseURL, getUserStatistic } from "./api_endpoints";

export class StatisticController {
  private accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public getUserStatistic = async (
    userId: string,
    scoreType: "latest" | "total",
  ): Promise<IGetStatistic | undefined> => {
    const AuthToken = "Bearer " + this.accessToken;

    const myHeaders = {
      Authorization: AuthToken,
      Accept: "application/json",
    };

    const service = axios.create({
      baseURL: baseURL,
      headers: myHeaders,
    });

    try {
      const result: AxiosResponse = await service.get(
        getUserStatistic(userId, scoreType),
      );

      if (result != null) {
        if (result.status === 200) {
          return result.data as IGetStatistic;
        } else {
          showToast(ToastType.error, "Error", result.status.toString());
          return;
        }
      } else {
        showToast(ToastType.error, "Error", "Network Error");
        return;
      }
    } catch (error) {
      showToast(ToastType.error, "Error", (error as Error).toString());
      return;
    }
  };
}
