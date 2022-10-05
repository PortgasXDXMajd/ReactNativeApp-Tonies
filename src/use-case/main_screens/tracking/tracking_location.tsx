import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { connect, useDispatch, useSelector } from "react-redux";
import { MainButton } from "../../../components/buttons/main_button";
import { TextButton } from "../../../components/buttons/text_button";
import { ExpandedBox } from "../../../components/common/expanded_box";
import { SizedBox } from "../../../components/common/sized_box";
import { NavigationParamsList } from "../../../components/navigation/navigation_param_list";
import { RouteNames } from "../../../components/navigation/route_names";
import { strings } from "../../../infrastructure/language/i18n";
import { ActionTypes } from "../../../infrastructure/redux/action_types";
import { StateModel } from "../../../infrastructure/redux/reducers";
import { TrackHelper } from "../../../infrastructure/track/track_helper";
import { COLORS, screenSize } from "../../../resources/theme";
import { ILocationPoint } from "../../../infrastructure/types/ILocationPoint";

export type TrackingLocationProps = NativeStackScreenProps<
  NavigationParamsList,
  RouteNames.trackingLocation
>;

const TrackingLocationScreen: React.FC<TrackingLocationProps> = (props) => {
  const app = useSelector((state: StateModel) => state.app);
  const tracker = useSelector((state: StateModel) => state.track);
  const dispatch = useDispatch();
  const LATITUDE_DELTA = 0.015;
  const ASPECT_RATIO = screenSize.width / screenSize.height;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [isFromHome, setIsFromHome] = useState<boolean>(true);
  const [isFromWork, setIsFromWork] = useState<boolean>(false);
  const [isToWork, setIsToWork] = useState<boolean>(true);
  const [isToHome, setIsToHome] = useState<boolean>(false);

  const styles = StyleSheet.create({
    textSmall: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: "500",
      color: COLORS.descriptionColor,
    },
    textBig: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
      color: "#121826",
    },
    map: {
      height: screenSize.height * 0.15,
      width: screenSize.width - 48,
    },
    optionsContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 4,
      borderRadius: 12,
      maxHeight: screenSize.height * 0.08,
      backgroundColor: "#F1F5F9",
    },
    button: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: screenSize.height * 0.08,
      margin: 4,
      borderRadius: 12,
    },
    fromButtonHomeText: {
      color: COLORS.descriptionColor,
      fontSize: 14,
      fontWeight: isFromHome ? "700" : "400",
    },
    fromButtonWorkText: {
      color: COLORS.descriptionColor,
      fontSize: 14,
      fontWeight: isFromWork ? "700" : "400",
    },
    toButtonHomeText: {
      color: COLORS.descriptionColor,
      fontSize: 14,
      fontWeight: isToHome ? "700" : "400",
    },
    toButtonWorkText: {
      color: COLORS.descriptionColor,
      fontSize: 14,
      fontWeight: isToWork ? "700" : "400",
    },
    noParamsView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      color: "red",
    },
    container: {
      flex: 1,
      paddingHorizontal: 25,
    },
    mainButton: {
      marginHorizontal: 20,
    },
    textButton: {
      marginTop: 15,
      marginBottom: 10,
    },
    isHomeView: {
      backgroundColor: isToHome ? "#fff" : "transparent",
    },
    isToWorkView: {
      backgroundColor: isToWork ? "#fff" : "transparent",
    },
    isFromHomeView: {
      backgroundColor: isFromHome ? "#fff" : "transparent",
    },
    isFromWork: {
      backgroundColor: isFromWork ? "#fff" : "transparent",
    },
  });

  const saveLocationToStore = (): void => {
    if (isFromHome) {
      dispatch({
        type: ActionTypes.SET_HOME_LOCATION,
        payload: props.route.params?.FromLocation,
      });

      dispatch({
        type: ActionTypes.SET_WORK_LOCATION,
        payload: props.route.params?.ToLocation,
      });
      TrackHelper.saveLocation(
        dispatch,
        app,
        props.route.params?.FromLocation as ILocationPoint,
        props.route.params?.ToLocation as ILocationPoint,
      );
      TrackHelper.getLocationPreview(
        dispatch,
        tracker,
        props.route.params?.FromLocation as ILocationPoint,
        props.route.params?.ToLocation as ILocationPoint,
      );
    } else {
      dispatch({
        type: ActionTypes.SET_HOME_LOCATION,
        payload: props.route.params?.ToLocation,
      });
      dispatch({
        type: ActionTypes.SET_WORK_LOCATION,
        payload: props.route.params?.FromLocation,
      });
      TrackHelper.saveLocation(
        dispatch,
        app,
        props.route.params?.ToLocation as ILocationPoint,
        props.route.params?.FromLocation as ILocationPoint,
      );
      TrackHelper.getLocationPreview(
        dispatch,
        tracker,
        props.route.params?.ToLocation,
        props.route.params?.FromLocation,
      );
    }
    props.navigation.goBack();
  };

  if (props.route.params === undefined) {
    return (
      <View style={styles.noParamsView}>
        <Text style={styles.errorText}>Error</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SizedBox height={70} width={undefined} />
      <Text style={styles.textSmall}>{strings.Label_greetings}</Text>
      <Text style={styles.textBig}>{strings.Label_whereToLive}</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsFromHome(true);
            setIsFromWork(false);
            setIsToWork(true);
            setIsToHome(false);
          }}
          style={[styles.button, styles.isFromHomeView]}>
          <Text style={styles.fromButtonHomeText}>{strings.Label_Home}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsFromHome(false);
            setIsFromWork(true);
            setIsToHome(true);
            setIsToWork(false);
          }}
          style={[styles.button, styles.isFromWork]}>
          <Text style={styles.fromButtonWorkText}>{strings.Label_Work}</Text>
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: props.route.params?.FromLocation.latitude,
          longitude: props.route.params?.FromLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        {isFromHome ? (
          <Marker
            coordinate={props.route.params?.FromLocation}
            image={require("../../../resources/assets/map/home.png")}
          />
        ) : (
          <Marker
            coordinate={props.route.params?.FromLocation}
            image={require("../../../resources/assets/map/office.png")}
          />
        )}
      </MapView>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsToHome(true);
            setIsToWork(false);
            setIsFromWork(true);
            setIsFromHome(false);
          }}
          style={[styles.button, styles.isHomeView]}>
          <Text style={styles.toButtonHomeText}>{strings.Label_Home}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsToHome(false);
            setIsToWork(true);
            setIsFromHome(true);
            setIsFromWork(false);
          }}
          style={[styles.button, styles.isToWorkView]}>
          <Text style={styles.toButtonWorkText}>{strings.Label_Work}</Text>
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: props.route.params?.ToLocation.latitude,
          longitude: props.route.params?.ToLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        {isToHome ? (
          <Marker
            coordinate={props.route.params?.FromLocation}
            image={require("../../../resources/assets/map/home.png")}
          />
        ) : (
          <Marker
            coordinate={props.route.params?.FromLocation}
            image={require("../../../resources/assets/map/office.png")}
          />
        )}
      </MapView>

      <ExpandedBox />

      <View style={styles.mainButton}>
        <MainButton
          onPress={() => {
            saveLocationToStore();
          }}
          label={strings.Label_ToSave}
          color={COLORS.primaryColor}
          onLongPress={() => saveLocationToStore()}
          isLoading={false}
        />
      </View>

      <View style={styles.textButton}>
        <TextButton
          isDisabled={false}
          onPress={() => {
            props.navigation.goBack();
          }}
          label={strings.Label_discard}
          labelSize={16}
          labelColor={"black"}
          isExplanationNeeded={false}
          explanationLabel={undefined}
          explanationLabelColor={undefined}
        />
      </View>
    </View>
  );
};

export default connect()(TrackingLocationScreen);
