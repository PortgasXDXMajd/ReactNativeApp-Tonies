export class Ride {
  public readonly rideId: number;
  public readonly rideName: string;
  public readonly rideDate: Date;
  public readonly rideStartLat: number;
  public readonly rideStartLong: number;
  public readonly rideEndLat: number;
  public readonly rideEndLong: number;
  public readonly rideDistance: number;
  public readonly rideDuration: number;
  public readonly rideElevationUp: number;
  public readonly rideElevationDown: number;

  public constructor(
    rideId: number,
    rideName: string,
    rideDate: Date,
    rideStartLat: number,
    rideStartLong: number,
    rideEndLat: number,
    rideEndLong: number,
    rideDistance: number,
    rideDuration: number,
    rideElevationUp: number,
    rideElevationDown: number,
  ) {
    this.rideId = rideId;
    this.rideName = rideName;
    this.rideDate = rideDate;
    this.rideStartLat = rideStartLat;
    this.rideStartLong = rideStartLong;
    this.rideEndLat = rideEndLat;
    this.rideEndLong = rideEndLong;
    this.rideDistance = rideDistance;
    this.rideDuration = rideDuration;
    this.rideElevationUp = rideElevationUp;
    this.rideElevationDown = rideElevationDown;
  }

  public static fromJson(json: IGetRide): Ride {
    return new Ride(
      json.id,
      json.name,
      json.date,
      json.start_point_lat,
      json.start_point_lng,
      json.end_point_lat,
      json.end_point_lng,
      json.distance,
      json.duration,
      json.elevation_up,
      json.elevation_down,
    );
  }
}

export interface IGetRide {
  id: number;
  name: string;
  date: Date;
  start_point_lat: number;
  start_point_lng: number;
  end_point_lat: number;
  end_point_lng: number;
  distance: number;
  duration: number;
  elevation_up: number;
  elevation_down: number;
}
