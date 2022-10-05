export class Statistic {
  public readonly statisticId: number;
  public readonly statisticUserId: string;
  public readonly statisticEmployeerId: number;
  public readonly statisticDistance: number;
  public readonly statistiTours: number;
  public readonly statistiAltitude: number;
  public readonly statistiDuration: number;

  public constructor(
    statisticId: number,
    statisticUserId: string,
    statisticEmployeerId: number,
    statisticDistance: number,
    statistiTours: number,
    statistiAltitude: number,
    statistiDuration: number,
  ) {
    this.statisticId = statisticId;
    this.statisticUserId = statisticUserId;
    this.statisticEmployeerId = statisticEmployeerId;
    this.statisticDistance = statisticDistance;
    this.statistiTours = statistiTours;
    this.statistiAltitude = statistiAltitude;
    this.statistiDuration = statistiDuration;
  }

  public build(): Statistic {
    return new Statistic(
      this.statisticId,
      this.statisticUserId,
      this.statisticEmployeerId,
      this.statisticDistance,
      this.statistiTours,
      this.statistiAltitude,
      this.statistiDuration,
    );
  }

  public static fromJson(json: IGetStatistic): Statistic {
    return new Statistic(
      json.id,
      json.user_id,
      json.employer_id,
      json.distance,
      json.tours,
      json.altitude,
      json.duration,
    );
  }
}

export interface IGetStatistic {
  id: number;
  user_id: string;
  employer_id: number;
  distance: number;
  tours: number;
  altitude: number;
  duration: number;
}
