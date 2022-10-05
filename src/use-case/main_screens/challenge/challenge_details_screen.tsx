import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { MainAppBar } from "../../../components/app_bar/main_app_bar";
import MyStatusBar from "../../../components/common/my_status_bar";
import { SizedBox } from "../../../components/common/sized_box";
import { renderLoadingData } from "../../../components/loader/loading_data";
import { NavigationParamsList } from "../../../components/navigation/navigation_param_list";
import { RouteNames } from "../../../components/navigation/route_names";
import {
  ChallengeController,
  IGetChallengeStatistic,
} from "../../../infrastructure/axios/challenge_controller";
import { strings } from "../../../infrastructure/language/i18n";
import { formatNumber } from "../../../infrastructure/number/big_numbers_helper";
import { StateModel } from "../../../infrastructure/redux/reducers";
import { COLORS, screenSize } from "../../../resources/theme";

export type IChallengeDetailsProps = NativeStackScreenProps<
  NavigationParamsList,
  RouteNames.challengeDetails
>;

const ChallengeDetailScreen: React.FunctionComponent<IChallengeDetailsProps> = (
  props,
) => {
  const app = useSelector((state: StateModel) => state.app);
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [challengeStatistic, setCahllengeStatistic] = useState<
    IGetChallengeStatistic | undefined
  >(undefined);

  useEffect(() => {
    getChallengeStatistic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChallengeStatistic = async () => {
    const challengeController = new ChallengeController(app.accessToken);
    const result = await challengeController.getChallengeStatistic(
      props.route.params.challenge.challengeId,
    );
    if (result !== undefined) {
      setCahllengeStatistic(result as IGetChallengeStatistic);
    }
    setisLoading(false);
  };

  if (isLoading) {
    return renderLoadingData();
  }
  return (
    <View style={styles.customContainer}>
      <MyStatusBar isTextBlack={false} backgroundColor={null} />

      <MainAppBar
        title={"Challenge"}
        titleColor={"white"}
        goBack={() => {
          navigation.goBack();
        }}
        color={null}
        backIconColor={null}
      />

      <View style={styles.whiteContainer}>
        <ScrollView>
          <ImageBackground
            resizeMode="cover"
            style={styles.ChallengeContainer}
            source={
              props.route.params.challenge.challengeImagePath != undefined &&
              props.route.params.challenge.challengeImagePath != ""
                ? { uri: props.route.params.challenge.challengeImagePath }
                : require("../../../resources/assets/dummy_images/default-statistic-image.png")
            }>
            <View style={styles.ChallengeBottomContainer}>
              <View>
                <Text style={styles.label_ChallengeName}>
                  {props.route.params.challenge.challengeName}
                </Text>
                <Text style={styles.label_ChallengeDescription}>
                  {props.route.params.challenge.challengeDescription}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.container}>
            <View style={styles.statisticContainer}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../../resources/assets/statistic/ic_bike.png")}
              />
              <SizedBox height={undefined} width={15} />
              <Text style={styles.Label}>
                {`${challengeStatistic?.tours ?? `--`} \n` +
                  strings.Label_ToursDriven}
              </Text>
            </View>

            <View style={styles.statisticContainer}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../../resources/assets/statistic/ic_distance.png")}
              />
              <SizedBox height={undefined} width={15} />
              <Text style={styles.Label}>
                {`${
                  formatNumber(Number(challengeStatistic?.distance)) ?? `--`
                } m\n` + strings.Label_DistanceManaged}
              </Text>
            </View>

            <View style={styles.statisticContainer}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../../resources/assets/statistic/ic_altitude.png")}
              />
              <SizedBox height={undefined} width={15} />
              <Text style={styles.Label}>
                {`${
                  formatNumber(Number(challengeStatistic?.altitude)) ?? `--`
                } m\n` + strings.Label_AltitudeOvercome}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
  },
  container: {
    flex: 1,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  statisticContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 24,
    margin: 15,
    borderRadius: 15,
  },
  image: {
    width: 50,
    height: 50,
  },
  Label: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
    marginLeft: 5,
  },
  label_ChallengeName: {
    lineHeight: 50,
    fontSize: 25,
    fontWeight: "300",
    color: "white",
  },
  label_ChallengeDescription: {
    lineHeight: 20,
    fontSize: 18,
    fontWeight: "200",
    color: "rgba(255,255,255,0.9)",
  },
  ChallengeContainer: {
    height: screenSize.width / 1.5,
  },
  ChallengeBottomContainer: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 45,
    marginTop: screenSize.width / 3.5,
  },
});

export default ChallengeDetailScreen;
