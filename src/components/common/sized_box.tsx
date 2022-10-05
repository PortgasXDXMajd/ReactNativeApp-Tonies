import * as React from "react";
import { View } from "react-native";

type ISizedBoxProps = {
  height: number | undefined;
  width: number | undefined;
};

export const SizedBox: React.FC<ISizedBoxProps> = (props) => {
  return (
    <View style={{ width: props.width ?? 0, height: props.height ?? 0 }}>
      {props.children}
    </View>
  );
};
