import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const screenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;
const navbarHeight = screenHeight - windowHeight + getStatusBarHeight();

export const screenSize = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  bottomBar: 65,
  appBar: 65,
  statusBar: getStatusBarHeight(),
  navBar: navbarHeight,
};

export const COLORS = {
  primaryColor: "#1E65AB",
  descriptionColor: "#64748B",
  textInputBackground: "rgba(248, 250, 252, 1)",
  black: "black",
  white: "white",
  error: "red",
};
