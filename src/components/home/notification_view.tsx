import moment from "moment";
import * as React from "react";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import { useSelector } from "react-redux";
import { NotificationController } from "../../infrastructure/axios/notification_controller";
import { strings } from "../../infrastructure/language/i18n";
import {
  Notification,
  NotificationTypes,
} from "../../infrastructure/models/notification";
import { StateModel } from "../../infrastructure/redux/reducers";
import { COLORS } from "../../resources/theme";
import { TextButton } from "../buttons/text_button";
import { SizedBox } from "../common/sized_box";

interface INotificationView {
  notification: Notification;
}

const NotificationView: React.FunctionComponent<INotificationView> = (
  props,
) => {
  const app = useSelector((state: StateModel) => state.app);
  const [IsDeactivated, setIsDeactivated] = useState<boolean>(false);
  const [IsDeactivating, setIsDeactivating] = useState<boolean>(false);

  const renderNotificationType = () => {
    switch (props.notification.notificationType) {
      case NotificationTypes.error:
        return (
          <Image
            source={require("../../resources/assets/icons/ic_noti_error.png")}
            style={styles.iconSize}
          />
        );
      case NotificationTypes.info:
        return (
          <Image
            source={require("../../resources/assets/icons/ic_noti_info.png")}
            style={styles.iconSize}
          />
        );
      case NotificationTypes.warn:
        return (
          <Image
            source={require("../../resources/assets/icons/ic_noti_warn.png")}
            style={styles.iconSize}
          />
        );
      default:
        return React.Fragment;
    }
  };

  const deactivateNotification = async () => {
    setIsDeactivating(true);
    const notificationController: NotificationController =
      new NotificationController(app.accessToken);
    const result = await notificationController.deactivateNotification(
      props.notification.notificationId,
    );
    if (result !== undefined) {
      setIsDeactivated(true);
    }
    setIsDeactivating(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationRowContainer}>
        <View style={styles.notificationView}>
          <View style={styles.notificationTypeContainer}>
            {renderNotificationType()}
          </View>
          <View style={styles.labelView}>
            <Text style={styles.timeLabel}>
              {moment(props.notification.notificationStartPeriod).format(
                "D.M.YYYY - HH:mm",
              )}
            </Text>
            <Text style={styles.notificationMessage}>
              {props.notification.notificationMessage}
            </Text>
          </View>
        </View>

        <View style={styles.button}>
          {IsDeactivating ? (
            <React.Fragment />
          ) : (
            <TextButton
              isDisabled={IsDeactivated}
              onPress={deactivateNotification}
              label={
                !IsDeactivated
                  ? strings.Label_Deactivate
                  : strings.Label_Deactivated
              }
              labelSize={12}
              labelColor={!IsDeactivated ? "red" : "grey"}
              isExplanationNeeded={false}
              explanationLabel={undefined}
              explanationLabelColor={undefined}
            />
          )}
        </View>
      </View>

      <SizedBox height={10} width={undefined} />

      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(248, 250, 252, 1)",
    borderRadius: 15,
  },
  notificationRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationTypeContainer: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(248, 250, 252, 1)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationMessage: {
    color: "black",
    lineHeight: 20,
    fontWeight: "300",
  },
  timeContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  timeLabel: {
    color: COLORS.descriptionColor,
    fontSize: 10,
    fontWeight: "300",
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  notificationView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelView: {
    marginLeft: 20,
  },
});

export default NotificationView;
