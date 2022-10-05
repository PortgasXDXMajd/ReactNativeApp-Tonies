import React, { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import MyStatusBar from "../../../components/common/my_status_bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector, useDispatch, connect } from "react-redux";
import { ExpandedBox } from "../../../components/common/expanded_box";
import { NavigationParamsList } from "../../../components/navigation/navigation_param_list";
import { RouteNames } from "../../../components/navigation/route_names";
import { StateModel } from "../../../infrastructure/redux/reducers";
import { TrackHelper } from "../../../infrastructure/track/track_helper";
import { screenSize, COLORS } from "../../../resources/theme";
import { ActionTypes } from "../../../infrastructure/redux/action_types";

import { MapDistance } from "../../../components/tracking/MapDistance";
import { TripInfo } from "../../../components/tracking/TripInfo";
import { OverWriteBox } from "../../../components/tracking/OverWriteBox";
import { TrackingButton } from "../../../components/tracking/TrackingButton";
import { ResetRegionIcon } from "../../../components/tracking/ResetRegionIcon";
import { HomeMarker } from "../../../components/tracking/HomeMarker";
import { WorkMarker } from "../../../components/tracking/WorkMarker";

export type ITrackingMainProps = NativeStackScreenProps<
  NavigationParamsList,
  RouteNames.trackingMain
>;

let locationLoaded = false;
const TrackScreen: React.FunctionComponent<ITrackingMainProps> = (props) => {
  const dispatch = useDispatch();

  const tracker = useSelector((state: StateModel) => state.track);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [mapview, setMapView] = useState<MapView>();
  const [locationData, setLocationData] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035 * (screenSize.width / screenSize.height),
  });

  useEffect(() => {
    locationLoaded = false;
    TrackHelper.getCurrentLocation(dispatch);

    return () => {
      dispatch({
        type: ActionTypes.SET_IS_TRACKING_ENABLED,
        payload: false,
      });
      dispatch({
        type: ActionTypes.SET_IS_TRACKING_STOPPED,
        payload: false,
      });
      dispatch({
        type: ActionTypes.DISCARD_TRIP,
      });
    };
  }, [dispatch]);

  const handleResetRegion = useCallback(() => {
    const newLatitude = tracker.userLocation?.latitude || locationData.latitude;
    const newLongitude =
      tracker.userLocation?.longitude || locationData.longitude;

    setLocationData({
      ...locationData,
      latitude: newLatitude,
      longitude: newLongitude,
    });

    mapview?.animateToRegion(
      {
        latitude: newLatitude,
        longitude: newLongitude,
        latitudeDelta: locationData.latitudeDelta,
        longitudeDelta: locationData.longitudeDelta,
      },
      1000,
    );
  }, [tracker.userLocation, locationData, mapview]);

  useEffect(() => {
    const latitude = tracker.userLocation?.latitude;
    const longitude = tracker.userLocation?.longitude;
    if (
      latitude &&
      latitude !== 0 &&
      longitude &&
      longitude !== 0 &&
      !locationLoaded
    ) {
      handleResetRegion();
      locationLoaded = true;
    }
  }, [tracker.userLocation, handleResetRegion]);

  return (
    <>
      <View style={styles.container}>
        {tracker.isTrackingEnabled ? (
          <MyStatusBar
            isTextBlack={true}
            backgroundColor={"rgba(76, 175, 80, 0.8)"}
          />
        ) : null}
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            zoomEnabled={true}
            scrollEnabled={true}
            initialRegion={{
              ...locationData,
            }}
            onRegionChangeComplete={(region) => {
              setLocationData({
                ...region,
              });
            }}
            ref={(c: MapView) => setMapView(c)}>
            {tracker.userLocation != undefined ? (
              <Marker title="You" coordinate={tracker.userLocation}>
                <Image
                  source={require("../../../resources/assets/map/markImg.png")}
                  style={styles.iconSize}
                  resizeMode="center"
                  resizeMethod="resize"
                />
              </Marker>
            ) : null}
            <HomeMarker coordinate={tracker.homeLocation} />
            <WorkMarker coordinate={tracker.workLocation} />
            {tracker.trackedCoordinates.size > 0 ? (
              <Polyline
                coordinates={Array.from(tracker.trackedCoordinates.values())}
                strokeColor={COLORS.primaryColor}
                strokeWidth={4}
                geodesic
              />
            ) : null}
          </MapView>
        </View>

        <ResetRegionIcon
          handleResetRegion={handleResetRegion}
          locationData={locationData}
          userLocation={tracker.userLocation}
        />

        <MapDistance />

        <TripInfo userLocationPreview={tracker.userLocationPreview} />

        <ExpandedBox />

        <OverWriteBox isSelected={isSelected} setIsSelected={setIsSelected} />

        <TrackingButton
          isSelected={isSelected}
          tracker={tracker}
          navigation={props.navigation}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    height: screenSize.height * 0.45,
    width: screenSize.width,
  },
  container: {
    flex: 1,
  },
  iconSize: {
    width: 35,
    height: 35,
  },
});

export default connect()(TrackScreen);
