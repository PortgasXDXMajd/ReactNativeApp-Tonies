import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { TextButton } from "../../../components/buttons/text_button";
import ChallengesListView from "../../../components/challenges/challenges_list_view";
import { SizedBox } from "../../../components/common/sized_box";
import { RouteNames } from "../../../components/navigation/route_names";
import { strings } from "../../../infrastructure/language/i18n";
import { StateModel } from "../../../infrastructure/redux/reducers";
import { COLORS, screenSize } from "../../../resources/theme";

const ChallengeScreen: React.FunctionComponent = () => {
  const app = useSelector((state: StateModel) => state.app);
  const data = useSelector((state: StateModel) => state.data);
  const navigation = useNavigation();

  if (app.isGettingData) {
    return <React.Fragment />;
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.buttonView}>
          <TextButton
            onPress={() => {
              // @ts-ignore
              navigation.navigate(RouteNames.challengeCreation);
            }}
            label={strings.Label_CreateChallenge}
            labelSize={14}
            labelColor={COLORS.descriptionColor}
            isExplanationNeeded={false}
            explanationLabel={undefined}
            explanationLabelColor={undefined}
            isDisabled={null}
          />
        </View>
        <ChallengesListView
          challengesList={data.userChallengesList}
          label={strings.label_YourChallenges}
        />
        <SizedBox height={10} width={undefined} />
        <ChallengesListView
          challengesList={data.userOtherChallengesList}
          label={strings.label_OtherChallenges}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: screenSize.statusBar + 25,
    paddingHorizontal: 24,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default ChallengeScreen;
