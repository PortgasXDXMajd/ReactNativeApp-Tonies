import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Challenge } from "../../infrastructure/models/challenge";
import ChallengeView from "./challenge_view";

interface IChallengesListView {
  challengesList: Challenge[];
  label: string;
}

const ChallengesListView: React.FunctionComponent<IChallengesListView> = (
  props,
) => {
  if (props.challengesList.length <= 0) {
    return <React.Fragment />;
  }

  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      {props.challengesList.map((challenge) => {
        return (
          <ChallengeView key={challenge.challengeId} challenge={challenge} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "black",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
  },
});

export default ChallengesListView;
