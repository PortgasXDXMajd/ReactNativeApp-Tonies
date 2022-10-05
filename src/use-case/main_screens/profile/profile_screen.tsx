import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import IconButton from "../../../components/buttons/icon_button";
import { SizedBox } from "../../../components/common/sized_box";
import { AuthHelper } from "../../../infrastructure/auth/authentication_helper";
import { StateModel } from "../../../infrastructure/redux/reducers";
import {
  showToast,
  ToastType,
} from "../../../infrastructure/toast/toast_helper";
import { COLORS, screenSize } from "../../../resources/theme";
import { SelectLocationButton } from "../../../components/profile/select_location_button";
import { SupportButton } from "../../../components/profile/support_button";
import { RouteNames } from "../../../components/navigation/route_names";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen: React.FunctionComponent = () => {
  const app = useSelector((state: StateModel) => state.app);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  if (app.isGettingData) {
    return <React.Fragment />;
  }
  const handleNavigate = (type: string) => {
    // @ts-ignore
    navigation.navigate(RouteNames.selectLocation, {
      markerType: type,
    });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.iconsContainer}>
        <IconButton
          icon={require("../../../resources/assets/icons/ic_settings.png")}
          onPress={() => {
            showToast(ToastType.info, "Go to settings", " ");
          }}
        />
        <SizedBox height={undefined} width={10} />
        <IconButton
          onPress={() => {
            AuthHelper.logout(dispatch);
          }}
          icon={require("../../../resources/assets/icons/ic_logout.png")}
        />
      </View>

      <View style={styles.namesContainer}>
        <Text style={styles.userNameStyle}>
          {app.user?.firstName} {app.user?.lastName}
        </Text>
        <Text style={styles.companyStyle}>econsor mobile GmbH</Text>
      </View>
      <SelectLocationButton
        icon={require("../../../resources/assets/map/home.png")}
        label="Hausadresse"
        onPress={() => handleNavigate("home")}
      />
      <SelectLocationButton
        icon={require("../../../resources/assets/map/office.png")}
        label="Geschaftsadresse"
        onPress={() => handleNavigate("office")}
      />
      <View style={styles.supportView}>
        <Text style={styles.supportText}>Support</Text>
        <SupportButton label="Support & Feedback" />
        <SupportButton label="Privacy Policy" />
        <SupportButton label="Terms & Conditions" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: COLORS.white,
  },
  iconsContainer: {
    width: screenSize.width,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
  },
  namesContainer: {
    alignItems: "center",
  },
  userNameStyle: {
    color: COLORS.black,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "400",
  },
  companyStyle: {
    color: COLORS.descriptionColor,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
  },
  supportView: {
    marginTop: 40,
    marginLeft: 5,
  },
  supportText: {
    fontWeight: "bold",
    color: COLORS.descriptionColor,
    marginLeft: 20,
  },
});

export default connect()(ProfileScreen);
