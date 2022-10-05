import axios from "axios";
import jwt_decode from "jwt-decode";
import { baseURL, API_POINT } from "./api_endpoints";

export class UserController {
  private accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async getUserId(): Promise<string> {
    const result: { sub: string } = jwt_decode(this.accessToken);
    return result.sub;
  }

  public async getUserInfo(userId: string): Promise<IUserInfo> {
    const AuthToken = "Bearer " + this.accessToken;

    const myHeaders = {
      Authorization: AuthToken,
      Accept: "application/json",
    };

    const service = axios.create({
      baseURL: baseURL,
      headers: myHeaders,
    });

    const res = await service.get(`${API_POINT.getUser}${userId}`);

    return res.data as IUserInfo;
  }
}

export interface IUserInfo {
  readonly firstname: string;
  readonly lastname: string;
}
