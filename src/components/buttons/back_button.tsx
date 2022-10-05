import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { screenSize } from "../../resources/theme";

type Props = {
  onPress: () => void;
  isAbsoluteLocation: boolean;
  iconColor: string | null;
};

export const BackButton = (props: Props) => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <View
      style={
        props.isAbsoluteLocation ? styles.abBackButton : styles.backButton
      }>
      <Icon
        color={props.iconColor ?? "white"}
        size={20}
        name={Platform.OS === "ios" ? "chevron-left" : "arrow-left"}
      />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    zIndex: 100,
  },
  abBackButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    left: screenSize.width / 15,
    top: screenSize.height / 20,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    zIndex: 100,
  },
});
