export class Bonus {
  public readonly bonusId: number;
  public readonly bonusSortId: number;
  public readonly bonusTitle: string;
  public readonly bonusDetails: string;
  public readonly bonusDetailsLink: string;
  public readonly bonusDistance: number;
  public readonly bonusAltitude: number;
  public readonly bonusTourCount: number;
  public readonly bonusAmount: number;
  public readonly bonusAmountLeft: number;
  public readonly bonusAmountCashed: number;
  public readonly bonusIsMultipleCash: boolean;
  public readonly bonusStartValidityPeriod: Date;
  public readonly bonusEndValidityPeriod: Date;
  public readonly bonusImagePath: string | null;
  public readonly bonusEmployeerId: number;

  public constructor(
    bonusId: number,
    bonusSortId: number,
    bonusTitle: string,
    bonusDetails: string,
    bonusDetailsLink: string,
    bonusDistance: number,
    bonusAltitude: number,
    bonusTourCount: number,
    bonusAmount: number,
    bonusAmountLeft: number,
    bonusAmountCashed: number,
    bonusIsMultipleCash: boolean,
    bonusStartValidityPeriod: Date,
    bonusEndValidityPeriod: Date,
    bonusImagePath: string | null,
    bonusEmployeerId: number,
  ) {
    this.bonusId = bonusId;
    this.bonusSortId = bonusSortId;
    this.bonusTitle = bonusTitle;
    this.bonusDetails = bonusDetails;
    this.bonusDetailsLink = bonusDetailsLink;
    this.bonusDistance = bonusDistance;
    this.bonusAltitude = bonusAltitude;
    this.bonusTourCount = bonusTourCount;
    this.bonusAmount = bonusAmount;
    this.bonusAmountLeft = bonusAmountLeft;
    this.bonusAmountCashed = bonusAmountCashed;
    this.bonusIsMultipleCash = bonusIsMultipleCash;
    this.bonusStartValidityPeriod = bonusStartValidityPeriod;
    this.bonusEndValidityPeriod = bonusEndValidityPeriod;
    this.bonusImagePath = bonusImagePath;
    this.bonusEmployeerId = bonusEmployeerId;
  }

  public build(): Bonus {
    return new Bonus(
      this.bonusId,
      this.bonusSortId,
      this.bonusTitle,
      this.bonusDetails,
      this.bonusDetailsLink,
      this.bonusDistance,
      this.bonusAltitude,
      this.bonusTourCount,
      this.bonusAmount,
      this.bonusAmountLeft,
      this.bonusAmountCashed,
      this.bonusIsMultipleCash,
      this.bonusStartValidityPeriod,
      this.bonusEndValidityPeriod,
      this.bonusImagePath,
      this.bonusEmployeerId,
    );
  }

  public static fromJson(json: IGetBonus): Bonus {
    return new Bonus(
      json.id,
      json.sort_id,
      json.title,
      json.details,
      json.details_link,
      json.distance,
      json.altitude,
      json.count_tours,
      json.amount,
      json.amount_left,
      json.amount_cashed,
      json.multiple_cash,
      json.start_validity_period,
      json.end_validity_period,
      json.image_path,
      json.employer_id,
    );
  }
}

export interface IGetBonus {
  id: number;
  sort_id: number;
  title: string;
  details: string;
  details_link: string;
  distance: number;
  count_tours: number;
  altitude: number;
  amount: number;
  amount_left: number;
  amount_cashed: number;
  multiple_cash: boolean;
  start_validity_period: Date;
  end_validity_period: Date;
  image_path: string | null;
  employer_id: number;
}
