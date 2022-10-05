import * as React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { MainAppBar } from "../../components/app_bar/main_app_bar";
import { MainButton } from "../../components/buttons/main_button";
import { ExpandedBox } from "../../components/common/expanded_box";
import { SizedBox } from "../../components/common/sized_box";
import { strings } from "../../infrastructure/language/i18n";
import { COLORS, screenSize } from "../../resources/theme";
import { ILoginProps } from "./login_screen";

const EnterNewPasswordScreen: React.FunctionComponent<ILoginProps> = (
  props,
) => {
  // const [isOldPassShown, setIsOldPassShown] = useState(false);

  // const [isNewPassShown, setIsNewPassShown] = useState(false);

  // const [isNewConPassShown, IsnewConPassShown] = useState(false);

  const resetPass = () => undefined;

  return (
    <View style={styles.screen}>
      <MainAppBar
        title={""}
        goBack={() => {
          props.navigation.goBack();
        }}
        titleColor={"black"}
        color={null}
        backIconColor={null}
      />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.heading}>{strings.Label_EnterANewPassword}</Text>

        <Text style={styles.subHeading}>
          {strings.Label_EnterANewPasswordToChangeIt}
        </Text>

        <SizedBox height={50} width={undefined} />

        {/* <MainTextInput
          onChange={() => {
            return;
          }}
          isSecure={!isOldPassShown}
          backgroundColor="#F8FAFC"
          inputColor={COLORS.descriptionColor}
          hint={strings.Label_OldPassword}
          hintColor={COLORS.descriptionColor}
          isSuffixNeeded={true}
          suffixIconName={isOldPassShown ? "eye-outline" : "eye-off-outline"}
          suffixIconColor={COLORS.descriptionColor}
        />

        <MainTextInput
          onChange={() => {
            return;
          }}
          isSecure={!isNewPassShown}
          backgroundColor="#F8FAFC"
          inputColor={COLORS.descriptionColor}
          hint={strings.Label_NewPassword}
          hintColor={COLORS.descriptionColor}
          isSuffixNeeded={true}
          suffixIconName={isNewPassShown ? "eye-outline" : "eye-off-outline"}
          suffixIconColor={COLORS.descriptionColor}
        />

        <MainTextInput
          onChange={() => {
            return;
          }}
          isSecure={!isNewConPassShown}
          backgroundColor="#F8FAFC"
          inputColor={COLORS.descriptionColor}
          hint={strings.Label_NewPasswordConfirmation}
          hintColor={COLORS.descriptionColor}
          isSuffixNeeded={true}
          suffixIconName={isNewConPassShown ? "eye-outline" : "eye-off-outline"}
          suffixIconColor={COLORS.descriptionColor}
        /> */}
        <ExpandedBox />

        <View style={styles.buttonView}>
          <MainButton
            onPress={resetPass}
            label={strings.Label_ChangePassword}
            color={COLORS.primaryColor}
            onLongPress={resetPass}
            isLoading={false}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    height: screenSize.height,
    maxWidth: screenSize.width,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 24,
    height: screenSize.height,
    maxWidth: screenSize.width,
  },

  background: {
    flex: 1,
    width: "100%",
  },

  heading: {
    color: "black",
    fontSize: 24,
    height: 35,
    fontWeight: "700",
    marginTop: 38,
  },

  subHeading: {
    color: COLORS.descriptionColor,
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
    maxWidth: 327,
  },
  buttonView: {
    marginBottom: 25,
  },
});

export default EnterNewPasswordScreen;
