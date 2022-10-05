import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { StateModel } from "../../../infrastructure/redux/reducers";
import { COLORS, screenSize } from "../../../resources/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamsList } from "../../../components/navigation/navigation_param_list";
import { RouteNames } from "../../../components/navigation/route_names";
import MapView, {
  PROVIDER_GOOGLE,
  LatLng,
  Region,
  Marker,
} from "react-native-maps";
import { ILocationPoint } from "../../../infrastructure/types/ILocationPoint";
import { ActionTypes } from "../../../infrastructure/redux/action_types";
import {
  showToast,
  ToastType,
} from "../../../infrastructure/toast/toast_helper";

export type ISelectLocationScreenProps = NativeStackScreenProps<
  NavigationParamsList,
  RouteNames.selectLocation
>;

const SelectLocationScreen: React.FunctionComponent<
  ISelectLocationScreenProps
> = (props) => {
  // @ts-ignore
  const { markerType } = props.route.params;
  const tracker = useSelector((state: StateModel) => state.track);
  const location =
    markerType === "home" ? tracker.homeLocation : tracker.workLocation;
  const dispatch = useDispatch();
  const initialRegion: Region = {
    latitude: location?.latitude as number,
    longitude: location?.longitude as number,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035 * (screenSize.width / screenSize.height),
  };
  const [markerLocation, setMarkerLocation] = useState<ILocationPoint>({
    latitude: location?.latitude as number,
    longitude: location?.longitude as number,
    elevation: location?.elevation as number,
    time: location?.time,
  });

  const updateMarkerLocation = (coordinate: LatLng) => {
    setMarkerLocation({
      ...markerLocation,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  const saveLocation = () => {
    dispatch({
      type:
        markerType === "home"
          ? ActionTypes.SET_HOME_LOCATION
          : ActionTypes.SET_WORK_LOCATION,
      payload: markerLocation,
    });
    showToast(ToastType.success, "Location succesfully saved.", " ");
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomEnabled={true}
        scrollEnabled={true}
        initialRegion={{
          ...initialRegion,
        }}
        onPress={({ nativeEvent }) => {
          updateMarkerLocation(nativeEvent.coordinate);
        }}>
        <Marker
          coordinate={markerLocation}
          draggable
          onDragEnd={({ nativeEvent }) =>
            updateMarkerLocation(nativeEvent.coordinate)
          }
        />
      </MapView>
      <View style={styles.saveButtonView}>
        <TouchableOpacity style={styles.mainButton} onPress={saveLocation}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  saveButtonView: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  mainButton: {
    backgroundColor: COLORS.primaryColor,
    alignItems: "center",
    paddingVertical: 17,
    borderRadius: 12,
    shadowColor: "#000",
    borderColor: "000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    height: 22,
    fontWeight: "700",
    paddingHorizontal: 140,
  },
});

export default connect()(SelectLocationScreen);
