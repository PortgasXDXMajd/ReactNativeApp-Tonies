import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { StateModel } from "../../infrastructure/redux/reducers";
import { RouteNames } from "../navigation/route_names";

const NotificationIcon: React.FunctionComponent = () => {
  const navigation = useNavigation();
  const data = useSelector((state: StateModel) => state.data);

  const goToNotificationScreen = () => {
    // @ts-ignore
    navigation.navigate(RouteNames.notificationList);
  };

  return (
    <TouchableOpacity onPress={goToNotificationScreen}>
      <View style={styles.notificationContainer}>
        <View>
          {data.userNotification.length > 0 ? (
            <View style={styles.newNotificationContainer} />
          ) : (
            <React.Fragment />
          )}
          <Image
            source={require("../../resources/assets/icons/ic_bell.png")}
            style={styles.iconSize}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  notificationContainer: {
    width: 35,
    height: 35,
    backgroundColor: "rgba(248, 250, 252, 1)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  newNotificationContainer: {
    position: "absolute",
    width: 5,
    height: 5,
    backgroundColor: "red",
    borderRadius: 50,
    top: 3,
    right: 3,
    zIndex: 100,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
});

export default NotificationIcon;
