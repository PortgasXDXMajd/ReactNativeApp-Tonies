import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { strings } from "../../infrastructure/language/i18n";
import { StateModel } from "../../infrastructure/redux/reducers";
import { COLORS } from "../../resources/theme";
import NotificationIcon from "./notification_icon_view";

const GreetingView: React.FunctionComponent = () => {
  const app = useSelector((state: StateModel) => state.app);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greetingLabel}>
          {strings.Label_Hello + `, ` + app.user?.firstName}
        </Text>
      </View>

      <NotificationIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  greetingLabel: {
    lineHeight: 14,
    fontSize: 12,
    color: COLORS.descriptionColor,
    fontWeight: "500",
  },
});

export default GreetingView;
