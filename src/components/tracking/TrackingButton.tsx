import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../infrastructure/language/i18n";
import { StateModel } from "../../infrastructure/redux/reducers";
import { ITrackerIntitalState } from "../../infrastructure/redux/reducers/tracking_reducer";
import { TrackHelper } from "../../infrastructure/track/track_helper";
import { COLORS } from "../../resources/theme";
import { MainButton } from "../buttons/main_button";
import { ExpandedBox } from "../common/expanded_box";
import { SizedBox } from "../common/sized_box";
import { NavigationParamsList } from "../navigation/navigation_param_list";
import { RouteNames } from "../navigation/route_names";

interface TrackingButtonProps {
  readonly isSelected: boolean;
  readonly tracker: ITrackerIntitalState;
  readonly navigation: NativeStackNavigationProp<
    NavigationParamsList,
    RouteNames.trackingMain
  >;
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  viewStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export const TrackingButton: React.FunctionComponent<TrackingButtonProps> = ({
  isSelected,
  tracker,
  navigation,
}) => {
  const app = useSelector((state: StateModel) => state.app);

  const dispatch = useDispatch();

  const handlePress = () => {
    !tracker.isTrackingEnabled
      ? TrackHelper.startTracking(dispatch, tracker, app, navigation)
      : TrackHelper.stopTracking(dispatch, tracker, navigation, isSelected);
  };

  return (
    <View>
      {!tracker.isTrackingStopped ? (
        <View style={styles.container}>
          <MainButton
            onPress={handlePress}
            label={
              !tracker.isTrackingEnabled
                ? strings.Label_StartTracking
                : strings.Label_StopTracking
            }
            color={COLORS.primaryColor}
            onLongPress={handlePress}
            isLoading={false}
          />
        </View>
      ) : (
        <View>
          <View style={[styles.viewStyle, styles.container]}>
            <ExpandedBox>
              <MainButton
                onPress={() => {
                  TrackHelper.discardTrip(dispatch);
                }}
                label={strings.Label_discard}
                color={"red"}
                onLongPress={() => {
                  TrackHelper.discardTrip(dispatch);
                }}
                isLoading={false}
              />
            </ExpandedBox>
            <SizedBox width={10} height={undefined} />
            <ExpandedBox>
              <MainButton
                onPress={() => {
                  TrackHelper.uploadTripToServer(dispatch, tracker, app);
                }}
                label={strings.Label_UploadTracking}
                color={COLORS.primaryColor}
                onLongPress={() => {
                  TrackHelper.uploadTripToServer(dispatch, tracker, app);
                }}
                isLoading={false}
              />
            </ExpandedBox>
          </View>
        </View>
      )}
    </View>
  );
};
