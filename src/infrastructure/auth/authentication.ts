import { Platform } from "react-native";
import { authorize, refresh } from "react-native-app-auth";
import { RNS_Keys, saveDataSecurly } from "../secure_storage/rns_info";
import { IAuthUserResponse } from "../storage/storage_helper";

export const config = {
  warmAndPrefetchChrome: Platform.OS === "android",
  serviceConfiguration: {
    authorizationEndpoint:
      "https://auth.test.pendlerratd.com/auth/realms/PendlerRatD_Test/protocol/openid-connect/auth",
    tokenEndpoint:
      "https://auth.test.pendlerratd.com/auth/realms/PendlerRatD_Test/protocol/openid-connect/token",
  },
  clientId: "prd-native-app",
  clientSecret: "805c848d-525a-4a7e-aef0-d58376c1d445",
  redirectUrl: "com.pendlerratd://auth/callback",
  scopes: ["openid", "profile", "api", "offline_access"],
};

export const authenticateUser = async (): Promise<IAuthUserResponse> => {
  try {
    const result = await authorize(config);
    if (result != null) {
      const resAccessToken = await saveDataSecurly(
        RNS_Keys.AccessToken,
        result.accessToken,
      );
      const resRefreshToken = await saveDataSecurly(
        RNS_Keys.RefreshToken,
        result.refreshToken,
      );

      if (resAccessToken && resRefreshToken) {
        return {
          data: {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          },
          result: true,
          message: "Successful login",
        };
      } else {
        return {
          data: undefined,
          result: false,
          message: `couldn't save token`,
        };
      }
    } else {
      return {
        data: undefined,
        result: false,
        message: "no token recieved",
      };
    }
  } catch (error) {
    return {
      data: undefined,
      result: false,
      message: "server error",
      error: error,
    };
  }
};

export const refreshAuthentication = async (
  refToken: string,
): Promise<{ result: boolean; accToken: string; refToken: string }> => {
  const result = await refresh(config, {
    refreshToken: refToken,
  });

  const resAccessToken = await saveDataSecurly(
    RNS_Keys.AccessToken,
    result.accessToken,
  );
  const resRefreshToken = await saveDataSecurly(
    RNS_Keys.RefreshToken,
    result.refreshToken ?? " ",
  );

  if (resAccessToken && resRefreshToken) {
    return {
      result: true,
      accToken: result.accessToken,
      refToken: result.refreshToken ?? "",
    };
  } else {
    return {
      result: false,
      accToken: "",
      refToken: "",
    };
  }
};
