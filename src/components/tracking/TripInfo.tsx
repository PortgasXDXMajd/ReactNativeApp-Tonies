import moment from "moment";
import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { UserPossibleLocation } from "../../infrastructure/enums/UserPossibleLocation";
import { COLORS, screenSize } from "../../resources/theme";

interface TripInfoProps {
  readonly userLocationPreview: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    width: screenSize.width - 48,
    height: screenSize.height * 0.1,
    top: screenSize.height * 0.45 + screenSize.height * 0.1 * 0.5,
    marginHorizontal: 24,
    marginTop: 10,
    justifyContent: "space-between",
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
  icon: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
});

export const TripInfo: React.FunctionComponent<TripInfoProps> = ({
  userLocationPreview,
}) => {
  const renderRoutePreview = (): React.ReactElement => {
    switch (userLocationPreview) {
      case UserPossibleLocation.HOME:
        return (
          <View style={styles.locationPreview}>
            <Image
              style={styles.icon}
              source={require("../../resources/assets/map/home.png")}
            />
            <Image
              style={styles.icon}
              source={require("../../resources/assets/map/arrow.png")}
            />
            <Image
              style={styles.icon}
              source={require("../../resources/assets/map/office.png")}
            />
          </View>
        );
      case UserPossibleLocation.OFFICE:
        return (
          <View style={styles.locationPreview}>
            <Image
              style={styles.icon}
              source={require("../../resources/assets/map/office.png")}
            />
            <Image
              style={styles.icon}
              source={require("../../resources/assets/map/arrow.png")}
            />
            <Image
              style={styles.icon}
              source={require("../../resources/assets/map/home.png")}
            />
          </View>
        );

      default:
        return <React.Fragment />;
    }
  };

  return (
    <View style={styles.container}>
      <View>{renderRoutePreview()}</View>
      <View>
        <Text style={styles.dateTime}>
          {moment(Date.now()).format("D.M.YYYY - HH:mm")}
        </Text>
      </View>
    </View>
  );
};
