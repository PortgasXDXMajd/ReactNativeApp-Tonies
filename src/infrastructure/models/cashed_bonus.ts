export class CashedBonus {
  public readonly id: number;
  public readonly userId: string;
  public readonly bonusId: number;
  public readonly emplpyerId: number;
  public readonly cashDate: Date;
  public readonly status: number;
  public readonly cashCode: string;
  public readonly qrCode: string;
  public readonly bonus_title: string;
  public readonly bonus_employer: string;
  public readonly bonus_employer_type: string;

  public constructor(
    id: number,
    userId: string,
    bonusId: number,
    emplpyerId: number,
    cashDate: Date,
    status: number,
    cashCode: string,
    qrCode: string,
    bonus_title: string,
    bonus_employer: string,
    bonus_employer_type: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.bonusId = bonusId;
    this.emplpyerId = emplpyerId;
    this.cashDate = cashDate;
    this.status = status;
    this.cashCode = cashCode;
    this.qrCode = qrCode;
    this.bonus_title = bonus_title;
    this.bonus_employer = bonus_employer;
    this.bonus_employer_type = bonus_employer_type;
  }

  public build(): CashedBonus {
    return new CashedBonus(
      this.id,
      this.userId,
      this.bonusId,
      this.emplpyerId,
      this.cashDate,
      this.status,
      this.cashCode,
      this.qrCode,
      this.bonus_title,
      this.bonus_employer,
      this.bonus_employer_type,
    );
  }

  public static fromJson(json: IGetCashedBonus): CashedBonus {
    return new CashedBonus(
      json.id,
      json.user_id,
      json.bonus_id,
      json.employer_id,
      json.cash_date,
      json.status,
      json.cash_code,
      json.qr_code,
      json.bonus_title,
      json.bonus_employer,
      json.bonus_employer_type,
    );
  }
}

export interface IGetCashedBonus {
  id: number;
  user_id: string;
  bonus_id: number;
  employer_id: number;
  cash_date: Date;
  status: number;
  cash_code: string;
  qr_code: string;
  bonus_title: string;
  bonus_employer: string;
  bonus_employer_type: string;
}
