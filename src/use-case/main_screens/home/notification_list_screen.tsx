import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { MainAppBar } from "../../../components/app_bar/main_app_bar";
import NotificationView from "../../../components/home/notification_view";
import { strings } from "../../../infrastructure/language/i18n";
import { Notification } from "../../../infrastructure/models/notification";
import { StateModel } from "../../../infrastructure/redux/reducers";
import { COLORS } from "../../../resources/theme";

const NotificationListScreen: React.FunctionComponent = () => {
  const navigation = useNavigation();
  const notificationList = useSelector(
    (state: StateModel) => state.data,
  ).userNotification;

  const renderNoNotificationView = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      text: {
        fontSize: 16,
        textAlign: "center",
        color: COLORS.descriptionColor,
      },
    });
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{strings.Label_NoNotification}</Text>
      </View>
    );
  };

  const renderNotificationList = () => {
    const styles = StyleSheet.create({
      listContainer: {
        paddingHorizontal: 12,
      },
    });
    return (
      <View style={styles.listContainer}>
        <ScrollView>
          {notificationList.map((noti: Notification) => {
            return (
              <NotificationView key={noti.notificationId} notification={noti} />
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <>
      <MainAppBar
        title={strings.Label_Notification}
        color={"transparent"}
        goBack={() => {
          navigation.goBack();
        }}
        backIconColor={"black"}
        titleColor={"black"}
      />
      {notificationList.length <= 0
        ? renderNoNotificationView()
        : renderNotificationList()}
    </>
  );
};

export default NotificationListScreen;
