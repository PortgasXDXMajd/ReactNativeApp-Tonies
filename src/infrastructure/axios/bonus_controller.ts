import axios, { AxiosResponse } from "axios";
import { IGetBonus } from "../models/bonus";
import { IGetCashedBonus } from "../models/cashed_bonus";
import { showToast, ToastType } from "../toast/toast_helper";
import {
  baseURL,
  getBonusRedeemURL,
  getUserBonusesURL,
  getUserCashedBonusesURL,
} from "./api_endpoints";

export class BonusesController {
  private accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public redeemBonus = async (bonusId: number): Promise<boolean> => {
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
      const result = await service.post(getBonusRedeemURL(bonusId));

      if (result != null) {
        if (result.status === 200) {
          return true;
        } else {
          showToast(ToastType.error, "Error", result.status.toString());
          return false;
        }
      } else {
        showToast(ToastType.error, "Error", "Network Error");
        return false;
      }
    } catch (error) {
      showToast(ToastType.error, "Error", (error as Error).toString());
      return false;
    }
  };

  public getUserBonuses = async (
    userId: string,
  ): Promise<IGetBonus[] | undefined> => {
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
        getUserBonusesURL(userId),
      );

      if (result != null) {
        if (result.status === 200) {
          return result.data as IGetBonus[];
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

  public getCashedBonus = async (
    userId: string,
  ): Promise<IGetCashedBonus[] | undefined> => {
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
        getUserCashedBonusesURL(userId),
      );

      if (result != null) {
        if (result.status === 200) {
          return result.data as IGetCashedBonus[];
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
