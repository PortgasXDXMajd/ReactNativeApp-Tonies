import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { ILocationPoint } from "../../infrastructure/types/ILocationPoint";

interface HomeMarkerProps {
  readonly coordinate: ILocationPoint | undefined;
}

const HomeMarkerComp: React.FunctionComponent<HomeMarkerProps> = ({
  coordinate,
}) => {
  if (coordinate == undefined) {
    return null;
  }
  const styles = StyleSheet.create({
    iconSize: {
      width: 35,
      height: 35,
    },
  });
  return (
    <Marker title="Home" coordinate={coordinate}>
      <Image
        source={require("../../resources/assets/map/home.png")}
        style={styles.iconSize}
        resizeMode="center"
        resizeMethod="resize"
      />
    </Marker>
  );
};

export const HomeMarker = React.memo(HomeMarkerComp);
