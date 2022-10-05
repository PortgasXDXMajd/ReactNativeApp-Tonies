import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../use-case/main_screens/home/home_screen";
import ChallengeScreen from "../../use-case/main_screens/challenge/challenge_screen";
import RidesScreen from "../../use-case/main_screens/ride/rides_screen";
import ProfileScreen from "../../use-case/main_screens/profile/profile_screen";
import { TrackingStackNavigation } from "../../use-case/main_screens/tracking/tranking_stack_navigation";
import { Image } from "react-native-elements/dist/image/Image";
import { IBottomNavigationItem } from "../../infrastructure/types/IBotomNavigationItem";
import { strings } from "../../infrastructure/language/i18n";
import { StyleSheet, Text } from "react-native";
import { COLORS, screenSize } from "../../resources/theme";
const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    marginTop: 10,
    opacity: 0.4,
  },
  focusedIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  label: {
    color: COLORS.descriptionColor,
    paddingBottom: 5,
    fontSize: 11,
    opacity: 0.4,
  },
  focusedLabel: {
    color: COLORS.descriptionColor,
    paddingBottom: 5,
    fontSize: 13,
  },
});

const listOfBottomNavigationIcons: IBottomNavigationItem[] = [
  {
    label: strings.Label_Home,
    icon: require("../../resources/assets/bottom_navigations_icons/ic_home.png"),
    component: HomeScreen,
  },
  {
    label: strings.Label_Challenge,
    icon: require("../../resources/assets/bottom_navigations_icons/ic_challenge.png"),
    component: ChallengeScreen,
  },
  {
    label: strings.Label_Track,
    icon: require("../../resources/assets/bottom_navigations_icons/ic_ride.png"),
    component: TrackingStackNavigation,
  },
  {
    label: strings.Label_Rides,
    icon: require("../../resources/assets/bottom_navigations_icons/ic_history.png"),
    component: RidesScreen,
  },
  {
    label: strings.Label_Profile,
    icon: require("../../resources/assets/bottom_navigations_icons/ic_user.png"),
    component: ProfileScreen,
  },
];
export const BottomNavigation = (): React.ReactElement => {
  return (
    <Tab.Navigator>
      {listOfBottomNavigationIcons.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.label}
            component={item.component}
            options={{
              headerShown: false,
              tabBarStyle: {
                height: screenSize.bottomBar,
              },
              tabBarLabel: ({ focused }) => (
                <Text style={focused ? styles.focusedLabel : styles.label}>
                  {item.label}
                </Text>
              ),
              tabBarIcon: ({ focused }) => (
                <Image
                  source={item.icon}
                  style={focused ? styles.focusedIcon : styles.icon}
                />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
