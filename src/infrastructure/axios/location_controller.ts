import axios from "axios";
import { showToast, ToastType } from "../toast/toast_helper";
import { baseURL, getSaveLocationURL } from "./api_endpoints";
import { ActionTypes } from "../redux/action_types";
import { ILocationPoint } from "../types/ILocationPoint";

interface ILocationServer {
  type: "HOME" | "OFFICE";
  latitude: number | null;
  longitude: number | null;
  id: number | null;
  country: string | null;
  house_number: string | null;
  postal_code: string | null;
  street: string | null;
  town: string | null;
}

export class LocationController {
  private accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async getUserHomeWorkLocations(
    userId: string | null,
    myDispatch: React.Dispatch<unknown>,
  ): Promise<boolean | undefined> {
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
      await service
        .get(getSaveLocationURL(userId ?? " "))
        .then((result) => {
          if (result != null) {
            if (result.status === 200) {
              const data = result.data;
              data.map((loc: ILocationServer) => {
                if (loc.type == "HOME") {
                  myDispatch({
                    type: ActionTypes.SET_HOME_LOCATION,
                    payload: {
                      longitude: loc.longitude,
                      latitude: loc.latitude,
                      elevation: 0,
                      time: Date.now(),
                    },
                  });
                } else {
                  myDispatch({
                    type: ActionTypes.SET_WORK_LOCATION,
                    payload: {
                      longitude: loc.longitude,
                      latitude: loc.latitude,
                      elevation: 0,
                      time: Date.now(),
                    },
                  });
                }
              });
              return true;
            } else {
              return;
            }
          } else {
            return;
          }
        })
        .catch(() => {
          return;
        });
    } catch (error) {
      return;
    }
    return;
  }

  public async saveUserLocations(
    userId: string | null,
    homeLocation: ILocationPoint | undefined,
    workLocation: ILocationPoint | undefined,
  ): Promise<boolean | undefined> {
    const AuthToken = "Bearer " + this.accessToken;
    const myHeaders = {
      Authorization: AuthToken,
      Accept: "application/json",
    };
    const service = axios.create({
      baseURL: baseURL,
      headers: myHeaders,
    });
    const requestModel = [
      {
        type: "HOME",
        latitude: homeLocation?.latitude,
        longitude: homeLocation?.longitude,
      },
      {
        type: "OFFICE",
        latitude: workLocation?.latitude,
        longitude: workLocation?.longitude,
      },
    ];

    try {
      await service
        .put(getSaveLocationURL(userId ?? " "), requestModel)
        .then((result) => {
          if (result != null) {
            if (result.status === 200) {
              showToast(ToastType.success, "Location Saved Successfully", ` `);
              return true;
            } else {
              showToast(
                ToastType.error,
                result.statusText,
                `error code ${result.status}`,
              );
              return;
            }
          } else {
            showToast(ToastType.error, "server is busy", " ");
            return;
          }
        })
        .catch((error) => {
          showToast(ToastType.error, "something went wrong", `${error}`);
          return;
        });
    } catch (error) {
      showToast(ToastType.error, "something went wrong", `${error}`);
      return;
    }
    return;
  }
}
