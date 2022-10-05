import * as React from "react";
import { View, StyleSheet } from "react-native";

export const ExpandedBox: React.FC = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  return <View style={styles.container}>{props.children}</View>;
};
