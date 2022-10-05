import * as React from "react";
import { useEffect } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { useDispatch, connect } from "react-redux";
import { AuthHelper } from "../infrastructure/auth/authentication_helper";
import { requestGeolocationPermission } from "../infrastructure/google_map/map_helper";
import { setInitialLanguage, strings } from "../infrastructure/language/i18n";
import { ActionTypes } from "../infrastructure/redux/action_types";
import { getData } from "../infrastructure/storage/storage_helper";
import { storageKeys } from "../infrastructure/storage/storage_keys";
import { COLORS, screenSize } from "../resources/theme";

const SplashScreen: React.FC = () => {
  const dispatch = useDispatch();

  const getLang = (): void => {
    let lang: string;
    getData(storageKeys.langKey).then((res) => {
      if (res.result && res.data !== null) {
        lang = res.data as string;
      } else {
        lang = "en";
      }
      dispatch({
        type: ActionTypes.SET_LANG,
        payload: lang,
      });
      setInitialLanguage(lang);
    });
    AuthHelper.checkForAccessToken(dispatch);
  };

  const createTwoButtonAlert = async () => {
    if (await AuthHelper.checkIsFirstTime(dispatch)) {
      Alert.alert(strings.label_attention, strings.label_attentionDescr, [
        {
          text: strings.Label_Cancel,
          style: "default",
        },
        {
          text: "Ok",
          onPress: () => {
            getPermissions();
          },
        },
      ]);
    } else {
      getPermissions();
    }
  };

  useEffect(() => {
    createTwoButtonAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPermissions = () => {
    getLang();
    requestGeolocationPermission();
  };

  return (
    <View style={styles.screen}>
      <Image
        style={styles.logo}
        source={require("../resources/assets/logo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: screenSize.width / 2,
    height: screenSize.height / 3,
    resizeMode: "contain",
  },
});

export default connect()(SplashScreen);
