import axios from "axios";
import moment from "moment";
import uuid from "react-native-uuid";
import { showToast, ToastType } from "../toast/toast_helper";
import { baseURL, API_POINT, getVerifyTourURL } from "./api_endpoints";
import { IValidationResult } from "../types/IValidationResult";

export class TrackingController {
  private accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async uploadTour(
    userId: string | null,
    gpx: string,
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
    const tourId = uuid.v4();
    const requestModel = {
      id: `${tourId}`,
      name: "Fahrt vom" + `${moment(Date.now()).format("DD-MM-YYYY")}`,
      user_id: `${userId}`,
      date: `${moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZ")}`,
      sport: "e_touringbicycle",
      track_data_filename: "native_app" + `${tourId}`,
      track_data: `${gpx}`,
    };

    try {
      await service
        .post(`${API_POINT.uploadTour}${userId}`, requestModel)
        .then((result) => {
          if (result != null) {
            if (result.status === 200) {
              const data = result.data as IGetTour;
              if (data.tour != null) {
                const res = this.verifyTour(data.tour.id);
                if (res !== undefined) {
                  showToast(
                    ToastType.success,
                    "Trip has been uploaded successfully",
                    " ",
                  );

                  //TODO: Send notification

                  return true;
                } else {
                  showToast(ToastType.error, "Trip couldn't get verified", " ");
                  return;
                }
              } else {
                const validationResults: IValidationResult[] =
                  result.data.validation_results;
                validationResults.forEach((x) => {
                  if (x.comment !== "") {
                    showToast(
                      ToastType.error,
                      x.constraint_display_name,
                      x.comment,
                    );
                  }
                });

                return;
              }
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

  public async verifyTour(tourId: number): Promise<boolean | undefined> {
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
        .patch(getVerifyTourURL(tourId))
        .then((result) => {
          if (result != null) {
            if (result.status === 200) {
              const data = result.data as IResponseVerifiyTour;
              if (data != null) {
                return true;
              } else {
                return;
              }
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
    } catch (err) {
      return;
    }
    return;
  }
}

interface IGetTour {
  tour: {
    id: number;
    provider: string;
    org_id: string;
    name: string;
    date: Date;
    source: string;
    sport: string;
    time_in_motion: number;
    saved_date: Date;
    gpx_filepath: string;
    img_map_filepath: string;
    img_preview_filepath: string;
    user_id: string;
    confirmed: boolean;
    start_point_lat: number;
    start_point_lng: number;
    start_point_alt: number;
    end_point_lat: number;
    end_point_lng: number;
    end_point_alt: number;
    distance: number;
    duration: number;
    status: number;
    elevation_up: number;
    elevation_down: number;
  };
}

interface IResponseVerifiyTour {
  code: string;
  message: string;
}
