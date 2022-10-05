import LottieView from "lottie-react-native";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { BackButton } from "../../../components/buttons/back_button";
import { MainButton } from "../../../components/buttons/main_button";
import { ExpandedBox } from "../../../components/common/expanded_box";
import MyStatusBar from "../../../components/common/my_status_bar";
import { NavigationParamsList } from "../../../components/navigation/navigation_param_list";
import { RouteNames } from "../../../components/navigation/route_names";
import { BonusesController } from "../../../infrastructure/axios/bonus_controller";
import { strings } from "../../../infrastructure/language/i18n";
import { StateModel } from "../../../infrastructure/redux/reducers";
import {
  showToast,
  ToastType,
} from "../../../infrastructure/toast/toast_helper";
import { COLORS, screenSize } from "../../../resources/theme";
import {
  IGetStatistic,
  Statistic,
} from "../../../infrastructure/models/statistic";
import BonusDetailsMeasures from "../../../components/bonus_details/bonus_details_measures";
import { SizedBox } from "../../../components/common/sized_box";
import React, { useState } from "react";
import { StatisticController } from "../../../infrastructure/axios/statisticController";
import { ActionTypes } from "../../../infrastructure/redux/action_types";
import { checkIfUserHaveEnoughCreditToRedeemBonus } from "../../../infrastructure/bonus/bonus_helper";

export type IBonusDetailsProps = NativeStackScreenProps<
  NavigationParamsList,
  RouteNames.bonusDetails
>;

const BonusDetailsScreen: React.FunctionComponent<IBonusDetailsProps> = (
  props: IBonusDetailsProps,
) => {
  const [isRedeemed, setIsRedeemed] = useState<boolean>(false);
  const [isRedeemedDone, setIsRedeemedDone] = useState<boolean>(false);
  const app = useSelector((state: StateModel) => state.app);
  const data = useSelector((state: StateModel) => state.data);
  const dispatch = useDispatch();

  const handleClosingGreyedArea = () => {
    setIsRedeemed(false);
    setIsRedeemedDone(false);
  };

  const redeemVoucher = async (): Promise<void> => {
    const result: boolean = await new BonusesController(
      app.accessToken,
    ).redeemBonus(props.route.params.bonus.bonusId);
    if (result) {
      setIsRedeemed(false);
      setIsRedeemedDone(true);

      const statisticController: StatisticController = new StatisticController(
        app.accessToken,
      );
      const latestResult: IGetStatistic | undefined =
        await statisticController.getUserStatistic(
          app.user?.userId ?? "",
          "latest",
        );

      if (latestResult !== undefined) {
        dispatch({
          type: ActionTypes.SET_LATEST_STATISTIC,
          payload: Statistic.fromJson(latestResult),
        });
      } else {
        showToast(
          ToastType.error,
          "Error",
          "We couldn't get your latest statistics",
        );
      }
    } else {
      showToast(ToastType.error, "Error", "We couldn't redeem your voucher");
    }
  };

  const renderAreYouSureToRedeem = (): React.ReactElement => {
    return (
      <TouchableWithoutFeedback onPress={handleClosingGreyedArea}>
        <View style={styles.blackScreen}>
          <Text style={styles.WhiteText}>{strings.Label_LongPressPlease}</Text>
          <View style={styles.blackScreenBottomContainer}>
            <MainButton
              onPress={() => {
                return;
              }}
              onLongPress={() => {
                redeemVoucher();
              }}
              label={strings.Label_Redeem}
              color={COLORS.primaryColor}
              isLoading={false}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderRedeemScreenDone = (): React.ReactElement => {
    return (
      <TouchableWithoutFeedback onPress={handleClosingGreyedArea}>
        <View style={styles.blackScreen}>
          <View
            style={{
              width: screenSize.width,
              height: screenSize.height,
            }}>
            <LottieView
              source={require("../../../resources/assets/bonus_redemed.json")}
              autoPlay
              loop
            />
          </View>
          <Text style={styles.WhiteText}>
            {strings["label_VoucherRedeemedSuccessfully!"]}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      <BackButton
        onPress={() => {
          if (isRedeemed || isRedeemedDone) {
            handleClosingGreyedArea();
          } else {
            props.navigation.goBack();
          }
        }}
        isAbsoluteLocation={true}
        iconColor={null}
      />

      {isRedeemed ? renderAreYouSureToRedeem() : <React.Fragment />}
      {isRedeemedDone ? renderRedeemScreenDone() : <React.Fragment />}

      <View style={styles.screen}>
        <MyStatusBar isTextBlack={false} backgroundColor={null} />
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            props.route.params.bonus.bonusImagePath != null &&
            props.route.params.bonus.bonusImagePath != ""
              ? { uri: props.route.params.bonus.bonusImagePath }
              : require("../../../resources/assets/dummy_images/bonus-dummy-image.jpg")
          }
        />

        <View style={styles.bonusDetailContainer}>
          <Text style={styles.bonusTitle}>
            {props.route.params.bonus.bonusTitle}
          </Text>
          <Text style={styles.bonusDetails}>
            {props.route.params.bonus.bonusDetails}
          </Text>
          {data.userLatestStatistic != undefined ? (
            <BonusDetailsMeasures
              userStatistic={data.userLatestStatistic}
              bonus={props.route.params.bonus}
            />
          ) : (
            <React.Fragment />
          )}
          <ExpandedBox />
          <View style={styles.bottomContainer}>
            <View style={styles.screen2}>
              <Text style={styles.bonusWarning}>
                {strings.Label_RedeemWaring}
              </Text>
            </View>
            <SizedBox width={5} height={undefined} />
            <View style={styles.screen}>
              <MainButton
                onPress={() => {
                  if (
                    checkIfUserHaveEnoughCreditToRedeemBonus(
                      props.route.params.bonus,
                      data.userLatestStatistic as Statistic,
                    )
                  ) {
                    setIsRedeemed(true);
                  } else {
                    showToast(
                      ToastType.info,
                      "You can't redeem this voucher now",
                      undefined,
                    );
                  }
                }}
                onLongPress={() => {
                  if (
                    checkIfUserHaveEnoughCreditToRedeemBonus(
                      props.route.params.bonus,
                      data.userLatestStatistic as Statistic,
                    )
                  ) {
                    setIsRedeemed(true);
                  } else {
                    showToast(
                      ToastType.info,
                      "You can't redeem this voucher now",
                      undefined,
                    );
                  }
                }}
                label={strings.Label_Redeem}
                color={COLORS.primaryColor}
                isLoading={false}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screen2: {
    flex: 2,
  },
  blackScreen: {
    width: screenSize.width,
    height: screenSize.height + screenSize.statusBar,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 5,
    alignItems: "center",
  },
  WhiteText: {
    color: "white",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 34,
    paddingHorizontal: 24,
    position: "absolute",
    flex: 1,
    top: screenSize.height * 0.5,
    zIndex: -1,
  },
  blackScreenBottomContainer: {
    paddingHorizontal: 12,
    marginBottom: 10,
    width: screenSize.width,
    position: "absolute",
    bottom: 0,
    flex: 0.1,
  },
  image: {
    width: screenSize.width,
    height: screenSize.height * 0.5,
  },
  bonusDetailContainer: {
    flex: 1,
    backgroundColor: "white",
    width: screenSize.width,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    position: "absolute",
    bottom: 0,
    top: screenSize.height * 0.45,
  },
  bonusTitle: {
    color: "black",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    paddingHorizontal: 12,
    marginTop: 45,
  },
  bonusDetails: {
    paddingHorizontal: 12,
    color: COLORS.descriptionColor,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    marginTop: 45,
  },
  bottomContainer: {
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 5,
  },
  bonusWarning: {
    color: "#696969",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default BonusDetailsScreen;
