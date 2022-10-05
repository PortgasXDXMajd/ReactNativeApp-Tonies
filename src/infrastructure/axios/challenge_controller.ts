import axios, { AxiosResponse } from "axios";
import { IGetChallenge } from "../models/challenge";
import { showToast, ToastType } from "../toast/toast_helper";
import {
  API_POINT,
  baseURL,
  getChallengeInformationURL,
  getChallengeStatisticURL,
  getUserChallengesListURL,
  getUserOtherChallengesListURL,
} from "./api_endpoints";

export class ChallengeController {
  private accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public getUserChallengeList = async (
    userId: string,
  ): Promise<IGetChallenge[] | undefined> => {
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
        getUserChallengesListURL(userId),
      );

      if (result != null) {
        if (result.status === 200) {
          const yourChallenges = result.data as IGetYourChallenges[];
          const yourChallengesList: IGetChallenge[] = [];
          yourChallenges.map(async (challenge) => {
            const response = await service.get(
              getChallengeInformationURL(challenge.id.challenge_id),
            );
            if (response.status == 200) {
              yourChallengesList.push(response.data as IGetChallenge);
            }
          });
          return yourChallengesList;
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

  public getUserOtherChallengeList = async (): Promise<
    IGetChallenge[] | undefined
  > => {
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
        getUserOtherChallengesListURL(),
      );

      if (result != null) {
        if (result.status === 200) {
          return result.data as IGetChallenge[];
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

  public getChallengeStatistic = async (challengeId: number) => {
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
        getChallengeStatisticURL(challengeId),
      );

      if (result != null) {
        if (result.status === 200) {
          return result.data as IGetChallengeStatistic;
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

  public createChallenge = async (
    newChallenge: ICreateChallenge,
  ): Promise<boolean> => {
    const AuthToken = "Bearer " + this.accessToken;

    const myHeaders = {
      Authorization: AuthToken,
      Accept: "application/json",
    };

    const service = axios.create({
      baseURL: baseURL,
      headers: myHeaders,
    });

    await service
      .post(API_POINT.createChallenge, newChallenge)
      .then((result: AxiosResponse) => {
        if (result !== null) {
          if (result.status === 200) {
            showToast(ToastType.success, "Challenge created successfully", " ");
            return true;
          } else {
            showToast(
              ToastType.info,
              "Attension",
              "you are already a member of a challenge",
            );
            return false;
          }
        } else {
          showToast(
            ToastType.info,
            "Attension",
            "you are already a member of a challenge",
          );
          return false;
        }
      })
      .catch(() => {
        showToast(
          ToastType.info,
          "Attension",
          "you are already a member of a challenge",
        );
        return false;
      });
    return false;
  };
}

export interface IGetChallengeStatistic {
  challengeId: number;
  distance: string;
  tours: number;
  altitude: string;
  duration: number;
  userScores: IGetUserScore[];
}

export interface IGetUserScore {
  id: number;
  user_id: string;
  employer_id: number;
  distance: number;
  tours: number;
  altitude: number;
  duration: number;
  user_firstname: string;
  user_lastname: string;
}

export interface IGetYourChallenges {
  id: {
    challenge_id: number;
    user_id: string;
  };
  user: {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    enabled: boolean;
  };
  entry_date: Date;
}

export interface ICreateChallenge {
  name: string;
  description: string;
  image_path: string;
}
