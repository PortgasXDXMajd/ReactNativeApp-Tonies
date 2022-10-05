import SInfo from "react-native-sensitive-info";
import { IResponse } from "../storage/storage_helper";

export enum RNS_Keys {
  AccessToken = "access token",
  RefreshToken = "refresh token",
}

export const saveDataSecurly = async (
  key: string,
  data: string,
): Promise<boolean> => {
  try {
    const savingData = await SInfo.setItem(key, data, {});
    if (savingData != null) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getDataSecurly = async (key: string): Promise<IResponse> => {
  try {
    const gettingData = await SInfo.getItem(key, {});
    if (gettingData != null) {
      return {
        data: gettingData,
        message: "Success",
        result: true,
      };
    } else {
      return {
        data: "",
        message: "fail",
        result: false,
      };
    }
  } catch (error) {
    return {
      data: "",
      message: "fail",
      result: false,
    };
  }
};

export const deleteTokens = async (): Promise<void> => {
  SInfo.deleteItem(RNS_Keys.AccessToken, {});
  SInfo.deleteItem(RNS_Keys.RefreshToken, {});
};
