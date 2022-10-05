import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Region } from "react-native-maps";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { ILocationPoint } from "../../infrastructure/types/ILocationPoint";
import { screenSize } from "../../resources/theme";

interface ResetRegionIconProps {
  readonly handleResetRegion: () => void;
  readonly userLocation: ILocationPoint | undefined;
  readonly locationData: Region;
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: screenSize.height * 0.45 - screenSize.height * 0.1 * 0.5 - 50,
    right: 25,
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const ResetRegionIcon: React.FunctionComponent<ResetRegionIconProps> = ({
  handleResetRegion,
  userLocation,
  locationData,
}) => {
  const [showResetIcon, setShowResetIcon] = React.useState(false);

  React.useEffect(() => {
    if (
      userLocation?.latitude != +locationData.latitude.toFixed(6) ||
      userLocation.longitude != +locationData.longitude.toFixed(6)
    ) {
      !showResetIcon && setShowResetIcon(true);
    } else {
      showResetIcon && setShowResetIcon(false);
    }
  }, [userLocation, locationData, showResetIcon]);

  if (!showResetIcon) {
    return null;
  }

  return (
    <Pressable
      style={styles.container}
      hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
      onPress={handleResetRegion}>
      <FontAwesome5Icon name="bullseye" size={25} />
    </Pressable>
  );
};
