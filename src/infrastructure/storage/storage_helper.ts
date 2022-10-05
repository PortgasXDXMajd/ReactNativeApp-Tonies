import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IResponse {
  result: boolean;
  data: string;
  message: string;
}

export interface IAuthUserResponse {
  result: boolean;
  data:
    | {
        accessToken: string;
        refreshToken: string;
      }
    | undefined;
  message: string;
  error?: unknown;
}

export const setData = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const getData = async (key: string): Promise<IResponse> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return {
        result: true,
        data: value,
        message: "Success",
      };
    } else {
      return {
        result: false,
        data: "",
        message: "not found",
      };
    }
  } catch (e) {
    return {
      result: false,
      data: "",
      message: "not found",
    };
  }
};
