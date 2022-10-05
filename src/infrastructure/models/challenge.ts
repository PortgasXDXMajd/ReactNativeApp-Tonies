export class Challenge {
  public readonly challengeId: number;
  public readonly challengeName: string;
  public readonly challengeDescription: string;
  public readonly challengeCreationDate: Date;
  public readonly challengeEmployeerId: number;
  public readonly challengeActivationStatus: boolean;
  public readonly challengeImagePath: string;

  public constructor(
    challengeId: number,
    challengeName: string,
    challengeDescription: string,
    challengeCreationDate: Date,
    challengeEmployeerId: number,
    challengeActivationStatus: boolean,
    challengeImagePath: string,
  ) {
    this.challengeId = challengeId;
    this.challengeName = challengeName;
    this.challengeDescription = challengeDescription;
    this.challengeCreationDate = challengeCreationDate;
    this.challengeEmployeerId = challengeEmployeerId;
    this.challengeActivationStatus = challengeActivationStatus;
    this.challengeImagePath = challengeImagePath;
  }

  public static fromJson(json: IGetChallenge): Challenge {
    return new Challenge(
      json.id,
      json.name,
      json.description,
      json.created_at,
      json.employer_id,
      json.active,
      json.image_path,
    );
  }
}

export interface IGetChallenge {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  employer_id: number;
  active: boolean;
  image_path: string;
}
