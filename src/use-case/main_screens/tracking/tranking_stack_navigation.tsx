import * as React from "react";
import { NavigationParamsList } from "../../../components/navigation/navigation_param_list";
import { RouteNames } from "../../../components/navigation/route_names";
import TrackScreen from "./track_screen";
import TrackingLocationScreen from "./tracking_location";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const TrackingStack = createNativeStackNavigator<NavigationParamsList>();

export const TrackingStackNavigation = (): React.ReactElement => {
  return (
    <TrackingStack.Navigator initialRouteName={RouteNames.trackingMain}>
      <TrackingStack.Screen
        name={RouteNames.trackingMain}
        component={TrackScreen}
        options={{ headerShown: false }}
      />
      <TrackingStack.Screen
        name={RouteNames.trackingLocation}
        component={TrackingLocationScreen}
        options={{ headerShown: false }}
      />
    </TrackingStack.Navigator>
  );
};
