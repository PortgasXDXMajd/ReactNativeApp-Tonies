import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS, screenSize } from "../../resources/theme";

export const renderLoadingData = (): React.ReactElement => {
  return (
    <View style={styles.spinner}>
      <ActivityIndicator size="large" color={COLORS.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    width: screenSize.width,
    height: screenSize.height,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
