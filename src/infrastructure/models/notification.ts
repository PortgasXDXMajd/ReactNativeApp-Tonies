export enum NotificationTypes {
  info = "INFO",
  error = "ERROR",
  warn = "WARN",
}
export enum NotificationCategories {
  CATEGORY_GENERAL = 0,
  CATEGORY_USER = 1,
  CATEGORY_EMPLOYER = 2,
}

export class Notification {
  public readonly notificationId: number;
  public readonly notificationType: NotificationTypes;
  public readonly notificationMessage: string;
  public readonly notificationCategory: NotificationCategories;
  public readonly notificationStartPeriod: Date;
  public readonly notificationEndPeriod: Date;
  public readonly notificationIsLinked: boolean;

  public constructor(
    notificationId: number,
    notificationType: NotificationTypes,
    notificationMessage: string,
    notificationCategory: NotificationCategories,
    notificationStartPeriod: Date,
    notificationEndPeriod: Date,
    notificationIsLinked: boolean,
  ) {
    this.notificationId = notificationId;
    this.notificationType = notificationType;
    this.notificationMessage = notificationMessage;
    this.notificationCategory = notificationCategory;
    this.notificationStartPeriod = notificationStartPeriod;
    this.notificationEndPeriod = notificationEndPeriod;
    this.notificationIsLinked = notificationIsLinked;
  }

  public build(): Notification {
    return new Notification(
      this.notificationId,
      this.notificationType,
      this.notificationMessage,
      this.notificationCategory,
      this.notificationStartPeriod,
      this.notificationEndPeriod,
      this.notificationIsLinked,
    );
  }

  public static fromJson(json: IGetNotification): Notification {
    return new Notification(
      json.id,
      json.type,
      json.message,
      json.category,
      json.start_period,
      json.end_period,
      json.linked,
    );
  }
}

export interface IGetNotification {
  id: number;
  type: NotificationTypes;
  message: string;
  category: NotificationCategories;
  start_period: Date;
  end_period: Date;
  linked: boolean;
}
