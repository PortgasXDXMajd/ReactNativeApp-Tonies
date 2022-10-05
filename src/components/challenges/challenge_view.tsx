import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Challenge } from "../../infrastructure/models/challenge";
import { screenSize } from "../../resources/theme";
import { RouteNames } from "../navigation/route_names";

interface IChallengeView {
  challenge: Challenge;
}

const ChallengeView: React.FunctionComponent<IChallengeView> = (props) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableNativeFeedback
        onPress={() => {
          // @ts-ignore
          navigation.navigate(RouteNames.challengeDetails, {
            challenge: props.challenge,
          });
        }}>
        <ImageBackground
          resizeMode="cover"
          style={styles.ChallengeContainer}
          imageStyle={styles.imageView}
          source={
            props.challenge.challengeImagePath != undefined &&
            props.challenge.challengeImagePath != ""
              ? { uri: props.challenge.challengeImagePath }
              : require("../../resources/assets/dummy_images/default-statistic-image.png")
          }>
          <View style={styles.ChallengeBottomContainer}>
            <View>
              <Text style={styles.label_ChallengeName}>
                {props.challenge.challengeName}
              </Text>
              <Text style={styles.label_ChallengeDescription}>
                {props.challenge.challengeDescription}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableNativeFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  label_ChallengeName: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  },
  label_ChallengeDescription: {
    lineHeight: 18,
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255,255,255,0.8)",
  },
  ChallengeContainer: {
    height: screenSize.width / 2,
    marginVertical: 10,
  },
  ChallengeBottomContainer: {
    position: "absolute",
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    width: "100%",
    bottom: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  imageView: {
    borderRadius: 12,
  },
});

export default ChallengeView;
