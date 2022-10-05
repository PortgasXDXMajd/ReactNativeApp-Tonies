import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { ILocationPoint } from "../../infrastructure/types/ILocationPoint";

interface WorkMarkerProps {
  readonly coordinate: ILocationPoint | undefined;
}

const WorkMarkerComp: React.FunctionComponent<WorkMarkerProps> = ({
  coordinate,
}) => {
  if (coordinate == undefined) {
    return null;
  }

  const styles = StyleSheet.create({
    icon: {
      width: 35,
      height: 35,
    },
  });
  return (
    <Marker title="Home" coordinate={coordinate}>
      <Image
        source={require("../../resources/assets/map/office.png")}
        style={styles.icon}
        resizeMode="center"
        resizeMethod="resize"
      />
    </Marker>
  );
};

export const WorkMarker = React.memo(WorkMarkerComp);
