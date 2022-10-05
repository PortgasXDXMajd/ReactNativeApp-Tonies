import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useRef } from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import { checkIfUserHaveEnoughCreditToRedeemBonus } from "../../infrastructure/bonus/bonus_helper";
import { Bonus } from "../../infrastructure/models/bonus";
import { Statistic } from "../../infrastructure/models/statistic";
import { StateModel } from "../../infrastructure/redux/reducers";
import { COLORS, screenSize } from "../../resources/theme";
import { RouteNames } from "../navigation/route_names";

interface IVoucherView {
  bonus: Bonus;
  isHorizontal: boolean;
}

const VoucherView: React.FunctionComponent<IVoucherView> = (props) => {
  const navigation = useNavigation();
  const data = useSelector((state: StateModel) => state.data);
  const AnimatedProgressBar = Animated.createAnimatedComponent(Progress.Bar);
  const progress: Animated.Value = new Animated.Value(0);
  const voucherPercentage = useRef<number>(-1);

  useEffect(() => {
    voucherPercentage.current = calculateProgess();
    //react-hooks/exhaustive-deps
    Animated.timing(progress, {
      toValue: voucherPercentage.current,
      duration: 300,
      useNativeDriver: false,
    }).start();
  });

  const calculateProgess = (): number => {
    let altPercentage: number;
    let disPercentage: number;
    let tourPercentage: number;
    const statistiAltitude = data.userLatestStatistic?.statistiAltitude ?? 0;
    const statisticDistance = data.userLatestStatistic?.statisticDistance ?? 0;
    const statisticTours = data.userLatestStatistic?.statistiTours ?? 0;
    if (statistiAltitude < props.bonus.bonusAltitude) {
      altPercentage = statistiAltitude / props.bonus.bonusAltitude;
    } else {
      altPercentage = 1;
    }
    if (statisticDistance < props.bonus.bonusDistance) {
      disPercentage = statisticDistance / props.bonus.bonusDistance;
    } else {
      disPercentage = 1;
    }
    if (statisticTours < props.bonus.bonusTourCount) {
      tourPercentage = statisticTours / props.bonus.bonusTourCount;
    } else {
      tourPercentage = 1;
    }
    return (altPercentage + disPercentage + tourPercentage) / 3;
  };

  const styles = StyleSheet.create({
    voucherContainer: {
      width: props.isHorizontal ? 150 : screenSize.width - 20,
      height: props.isHorizontal ? 150 : screenSize.width / 2,
      marginRight: props.isHorizontal ? 10 : 0,
      margin: props.isHorizontal ? 0 : 10,
    },
    voucherGreyContainer: {
      position: "absolute",
      zIndex: 100,
      width: props.isHorizontal ? 150 : screenSize.width - 20,
      height: props.isHorizontal ? 150 : screenSize.width / 2,
      marginRight: props.isHorizontal ? 10 : 0,
      margin: props.isHorizontal ? 0 : 10,
      backgroundColor: "rgba(128,128,128,0.6)",
      borderRadius: 12,
    },
    voucherBottomContainer: {
      position: "absolute",
      backgroundColor: "rgba(15, 23, 42, 0.4)",
      width: "100%",
      bottom: 0,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,

      padding: 5,
    },
    voucherLabel: {
      color: "white",
      fontSize: props.isHorizontal ? 14 : 18,
      fontWeight: "700",
      lineHeight: props.isHorizontal ? 20 : 25,
    },
    percentageLabel: {
      color: "white",
      fontSize: props.isHorizontal ? 11 : 15,
      fontWeight: "400",
      lineHeight: props.isHorizontal ? 10 : 15,
      textAlign: "center",
      margin: props.isHorizontal ? 2 : 4,
    },
    imageView: {
      borderRadius: 12,
    },
  });

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        // @ts-ignore
        navigation.navigate(RouteNames.bonusDetails, {
          bonus: props.bonus,
        })
      }>
      <View>
        {!checkIfUserHaveEnoughCreditToRedeemBonus(
          props.bonus,
          data.userTotalStatistic as Statistic,
        ) ? (
          props.isHorizontal ? (
            <View style={styles.voucherGreyContainer} />
          ) : (
            <React.Fragment />
          )
        ) : (
          <React.Fragment />
        )}
        <ImageBackground
          resizeMode="cover"
          style={styles.voucherContainer}
          imageStyle={styles.imageView}
          source={
            props.bonus.bonusImagePath != undefined &&
            props.bonus.bonusImagePath != ""
              ? { uri: props.bonus.bonusImagePath }
              : require("../../resources/assets/dummy_images/bonus-dummy-image.jpg")
          }>
          <View style={styles.voucherBottomContainer}>
            <Text style={styles.voucherLabel}>{props.bonus.bonusTitle}</Text>
            <AnimatedProgressBar
              progress={progress}
              width={props.isHorizontal ? 140 : screenSize.width - 30}
              color={COLORS.primaryColor}
              height={5}
              useNativeDriver={true}>
              <Text style={styles.percentageLabel}>
                {Math.floor(calculateProgess() * 100)} %
              </Text>
            </AnimatedProgressBar>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VoucherView;
