import * as React from "react";
import { StatusBar } from "react-native";

interface IStatusBarProps {
  isTextBlack: boolean;
  backgroundColor: string | null;
}

const MyStatusBar: React.FC<IStatusBarProps> = (props) => {
  return (
    <StatusBar
      translucent
      animated={true}
      backgroundColor={props.backgroundColor ?? "transparent"}
      barStyle={props.isTextBlack ? "dark-content" : "light-content"}
    />
  );
};

export default MyStatusBar;
