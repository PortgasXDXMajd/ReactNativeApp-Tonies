import * as React from "react";
import moment from "moment";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { checkRideDistination } from "../../infrastructure/google_map/map_helper";
import { strings } from "../../infrastructure/language/i18n";
import { Ride } from "../../infrastructure/models/ride";
import { StateModel } from "../../infrastructure/redux/reducers";
import { COLORS, screenSize } from "../../resources/theme";
import { SizedBox } from "../common/sized_box";
import { ILocationPoint } from "../../infrastructure/types/ILocationPoint";
import { UserPossibleLocation } from "../../infrastructure/enums/UserPossibleLocation";
import { formatNumber } from "../../infrastructure/number/big_numbers_helper";

interface IRideView {
  ride: Ride;
}

const RideView: React.FunctionComponent<IRideView> = (props) => {
  const tracker = useSelector((state: StateModel) => state.track);

  const renderRoutePreview = () => {
    const startLocation: ILocationPoint = {
      latitude: props.ride.rideStartLat,
      longitude: props.ride.rideStartLong,
      elevation: 0,
      time: undefined,
    };
    const endLocation: ILocationPoint = {
      latitude: props.ride.rideEndLat,
      longitude: props.ride.rideEndLong,
      elevation: 0,
      time: undefined,
    };
    switch (
      checkRideDistination(
        tracker.homeLocation as ILocationPoint,
        startLocation,
        endLocation,
      )
    ) {
      case UserPossibleLocation.HOME:
        return (
          <View style={styles.locationPreview}>
            <Image
              style={styles.iconSize}
              source={require("../../resources/assets/map/home.png")}
            />
            <Image
              style={styles.iconSize}
              source={require("../../resources/assets/map/arrow.png")}
            />
            <Image
              style={styles.iconSize}
              source={require("../../resources/assets/map/office.png")}
            />
          </View>
        );
      case UserPossibleLocation.OFFICE:
        return (
          <View style={styles.locationPreview}>
            <Image
              style={styles.iconSize}
              source={require("../../resources/assets/map/office.png")}
            />
            <Image
              style={styles.iconSize}
              source={require("../../resources/assets/map/arrow.png")}
            />
            <Image
              style={styles.iconSize}
              source={require("../../resources/assets/map/home.png")}
            />
          </View>
        );

      default:
        return (
          <Text style={styles.NoPreviewErrorLabel}>
            {strings.Label_NoLocationPreview}
          </Text>
        );
    }
  };

  return (
    <View style={styles.tripInfo}>
      <View>
        <View style={styles.routeView}>
          <View>{renderRoutePreview()}</View>
          <View>
            <Text style={styles.dateTime}>
              {moment(props.ride.rideDate).format("D.M.YYYY - HH:mm")}
            </Text>
          </View>
        </View>

        <SizedBox height={5} width={0} />

        <View style={styles.distanceContainer}>
          <View style={styles.distanceView}>
            <Image
              source={require("../../resources/assets/map/ic_distance.png")}
              style={styles.distanceIconSize}
            />
            <SizedBox width={12} height={undefined} />
            <View>
              <View style={styles.locationPreview}>
                <Text style={styles.textNumber}>
                  {formatNumber(props.ride.rideDistance)}
                </Text>
                <SizedBox width={5} height={undefined} />
                <Text style={styles.textNumber}>m</Text>
              </View>
            </View>
          </View>

          <View style={styles.minsView}>
            <Image
              source={require("../../resources/assets/map/ic_time.png")}
              style={styles.distanceIconSize}
            />
            <SizedBox width={12} height={undefined} />
            <View>
              <View style={styles.locationPreview}>
                <Text style={styles.textNumber}>
                  {(props.ride.rideDuration / 60).toFixed(0)}
                </Text>
                <SizedBox width={5} height={undefined} />
                <Text style={styles.textNumber}>mins</Text>
              </View>
            </View>
          </View>

          <View style={styles.minsView}>
            <Image
              source={require("../../resources/assets/map/ic_elevation.png")}
              style={styles.distanceIconSize}
            />
            <SizedBox width={12} height={undefined} />
            <View>
              <View style={styles.locationPreview}>
                <Text style={styles.textNumber}>
                  {formatNumber(props.ride.rideElevationUp)}
                </Text>
                <SizedBox width={5} height={undefined} />
                <Text style={styles.textNumber}>m</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginVertical: 10,
    paddingHorizontal: 24,
  },
  locationPreview: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dateTime: {
    color: COLORS.descriptionColor,
    fontSize: 12,
    lineHeight: 15,
  },
  NoPreviewErrorLabel: {
    color: COLORS.primaryColor,
    fontWeight: "300",
  },
  textName: {
    fontSize: 12,
    lineHeight: 14,
    color: COLORS.descriptionColor,
  },
  textNumber: {
    color: "#121826",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "600",
  },
  iconSize: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  routeView: {
    width: screenSize.width - 48,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  distanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  distanceView: {
    width: screenSize.width / 3,
    flexDirection: "row",
  },
  distanceIconSize: {
    width: 30,
    height: 30,
  },
  minsView: {
    width: screenSize.width / 3,
    flexDirection: "row",
  },
});

export default RideView;
