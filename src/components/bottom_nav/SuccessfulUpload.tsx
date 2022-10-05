import AnimatedLottieView from "lottie-react-native";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { strings } from "../../infrastructure/language/i18n";
import { ActionTypes } from "../../infrastructure/redux/action_types";
import { COLORS, screenSize } from "../../resources/theme";
import { MainButton } from "../buttons/main_button";
import { ExpandedBox } from "../common/expanded_box";

const styles = StyleSheet.create({
  container: {
    width: screenSize.width,
    height: screenSize.height + screenSize.statusBar,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 5,
    paddingTop: screenSize.height * 0.1,
    alignItems: "center",
  },
  successText: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "700",
    lineHeight: 32.4,
  },
  buttonContainer: {
    marginHorizontal: 10,
    marginBottom: 25,
  },
});

export const SuccessfulUpload: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch({
      type: ActionTypes.SET_IS_TRACKING_STOPPED,
      payload: false,
    });
    dispatch({
      type: ActionTypes.TOGGLE_UPLOAD_TRIP,
    });
    dispatch({
      type: ActionTypes.DISCARD_TRIP,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{ width: screenSize.width, height: screenSize.height * 0.3 }}>
        <AnimatedLottieView
          source={require("../../resources/assets/ride_upload_success.json")}
          autoPlay
          loop
        />
      </View>
      <Text style={styles.successText}>
        {strings.Label_SuccessUploadedRide}
      </Text>
      <ExpandedBox />
      <View
        style={[
          styles.buttonContainer,
          {
            width: screenSize.width - 20,
          },
        ]}>
        <MainButton
          onPress={handlePress}
          label={strings.Label_Back}
          color={COLORS.primaryColor}
          isLoading={false}
        />
      </View>
    </View>
  );
};
