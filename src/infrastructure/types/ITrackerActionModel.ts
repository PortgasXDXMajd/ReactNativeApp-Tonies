import { UserPossibleLocation } from "../enums/UserPossibleLocation";
import { ILocationPoint } from "./ILocationPoint";
export interface ITrackerActionModel {
  type: string;
  payload:
    | number
    | boolean
    | ILocationPoint
    | ILocationPoint[]
    | string
    | UserPossibleLocation
    | undefined;
}
