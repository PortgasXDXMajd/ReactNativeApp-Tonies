import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { StateModel } from "../../infrastructure/redux/reducers";
import SplashScreen from "../../use-case/splash_screen";
import BonusDetailsScreen from "../../use-case/main_screens/home/bonus_details_screen";
import EnterNewPasswordScreen from "../../use-case/registration_screens/enter_new_password_screen";
import ForgotPasswordScreen from "../../use-case/registration_screens/forgout_password_screen";
import LoginScreen from "../../use-case/registration_screens/login_screen";
import { NavigationParamsList } from "./navigation_param_list";
import { RouteNames } from "./route_names";
import BonusListScreen from "../../use-case/main_screens/home/bonus_list_screen";
import ChallengeDetailScreen from "../../use-case/main_screens/challenge/challenge_details_screen";
import NotificationListScreen from "../../use-case/main_screens/home/notification_list_screen";
import ChallengeCreationScreen from "../../use-case/main_screens/challenge/challenge_creation_screen";
import SelectLocationScreen from "../../use-case/main_screens/profile/select_location_screen";
import { BottomNavigation } from "./bottom_tab_bar";
const RootStack = createNativeStackNavigator<NavigationParamsList>();

export const RootStackNavigator = (): React.ReactElement => {
  const app = useSelector((state: StateModel) => state.app);

  if (app.isLoading) {
    return <SplashScreen />;
  }
  // else if (app.isFirstVisit) {
  //   return <IntroductionScreen />;
  // }
  return (
    <RootStack.Navigator>
      {app.user === undefined ? (
        <>
          <RootStack.Screen
            name={RouteNames.login}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name={RouteNames.forgotPassword}
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name={RouteNames.enterNewPassword}
            component={EnterNewPasswordScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <RootStack.Screen
            name={RouteNames.root}
            component={BottomNavigation}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name={RouteNames.challengeDetails}
            component={ChallengeDetailScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name={RouteNames.bonusDetails}
            component={BonusDetailsScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name={RouteNames.bonusList}
            component={BonusListScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name={RouteNames.notificationList}
            component={NotificationListScreen}
            options={{ headerShown: false }}
          />

          <RootStack.Screen
            name={RouteNames.challengeCreation}
            component={ChallengeCreationScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name={RouteNames.selectLocation}
            component={SelectLocationScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};
