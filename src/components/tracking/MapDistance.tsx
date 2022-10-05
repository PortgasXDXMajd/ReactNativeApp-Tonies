import * as React from "react";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { roundNumber } from "../../infrastructure/google_map/number_helper";
import { strings } from "../../infrastructure/language/i18n";
import { formatNumber } from "../../infrastructure/number/big_numbers_helper";
import { ActionTypes } from "../../infrastructure/redux/action_types";
import { StateModel } from "../../infrastructure/redux/reducers";
import { COLORS, screenSize } from "../../resources/theme";
import { SizedBox } from "../common/sized_box";

export const MapDistance: React.FunctionComponent = () => {
  const tracker = useSelector((state: StateModel) => state.track);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tracker.isTrackingEnabled) {
      startStopwatch();
    } else {
      tracker.stopwatch?.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracker.isTrackingEnabled]);

  const startStopwatch = async () => {
    tracker.stopwatch?.start();
    while (tracker.stopwatch?.isRunning) {
      await new Promise((r) => setTimeout(r, 1000));
      dispatch({
        type: ActionTypes.SET_RIDE_DURATION,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.distanceView}>
        <Image
          source={require("../../resources/assets/map/ic_distance.png")}
          style={styles.iconSize}
        />
        <SizedBox width={12} height={undefined} />
        <View>
          <Text style={styles.textName}>{strings.Label_Distance}</Text>
          <View style={styles.distanceView}>
            <Text style={styles.textNumber}>
              {tracker.stopwatch === undefined
                ? `--`
                : `${formatNumber(roundNumber(tracker.rideDistance))}`}
            </Text>
            <SizedBox width={5} height={undefined} />
            <Text style={styles.textNumber}>m</Text>
          </View>
        </View>
      </View>
      <View style={styles.verticalDivider} />
      <View style={styles.distanceView}>
        <Image
          source={require("../../resources/assets/map/ic_time.png")}
          style={styles.iconSize}
        />
        <SizedBox width={12} height={undefined} />
        <View>
          <Text style={styles.textName}>{strings.Label_Duration}</Text>
          <View style={styles.distanceView}>
            <Text style={styles.textNumber}>
              {tracker.stopwatch === undefined
                ? `--`
                : `${Math.round(tracker.rideDuration)}`}
            </Text>
            <SizedBox width={5} height={undefined} />
            <Text style={styles.textNumber}>mins</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "white",
    width: screenSize.width - 20,
    height: screenSize.height * 0.1,
    top: screenSize.height * 0.45 - screenSize.height * 0.1 * 0.5,
    marginHorizontal: 10,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    shadowColor: "#4e4e4e",
    borderColor: "000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  textName: {
    fontSize: 12,
    lineHeight: 14,
    color: COLORS.descriptionColor,
  },

  textNumber: {
    color: "#121826",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  verticalDivider: {
    backgroundColor: "#E2E8F0",
    width: 1,
    height: screenSize.height * 0.1 - 40,
    marginVertical: 20,
    borderRadius: 10,
    marginHorizontal: 35,
  },
  distanceView: {
    flex: 1,
    flexDirection: "row",
  },
  iconSize: {
    width: 48,
    height: 48,
  },
});
