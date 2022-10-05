import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { MainAppBar } from "../../components/app_bar/main_app_bar";
import { MainButton } from "../../components/buttons/main_button";
import { ExpandedBox } from "../../components/common/expanded_box";
import { SizedBox } from "../../components/common/sized_box";
import { NavigationParamsList } from "../../components/navigation/navigation_param_list";
import { RouteNames } from "../../components/navigation/route_names";
import { MainTextInput } from "../../components/text_inputs/main_text_input";
import { strings } from "../../infrastructure/language/i18n";
import { COLORS } from "../../resources/theme";

type IForgotPasswordProps = NativeStackScreenProps<
  NavigationParamsList,
  RouteNames.forgotPassword
>;

const ForgotPasswordScreen: React.FunctionComponent<IForgotPasswordProps> = (
  props,
) => {
  const restPassword = () => {
    props.navigation.navigate(RouteNames.enterNewPassword);
  };

  return (
    <View style={styles.screen}>
      <MainAppBar
        title={strings.Label_ResetPassword}
        goBack={() => {
          props.navigation.goBack();
        }}
        titleColor={"black"}
        color={null}
        backIconColor={null}
      />

      <KeyboardAvoidingView style={styles.container}>
        <SizedBox height={100} width={undefined} />
        <MainTextInput
          onChange={() => {
            return;
          }}
          isSecure={false}
          backgroundColor="#F8FAFC"
          inputColor={COLORS.descriptionColor}
          hint={strings.Label_Email}
          hintColor={COLORS.descriptionColor}
          isSuffixNeeded={false}
          suffixIconName={undefined}
          suffixIconColor={undefined}
        />

        <ExpandedBox />

        <View style={styles.buttonView}>
          <MainButton
            onPress={restPassword}
            label={strings.Label_ResetPassword}
            color={COLORS.primaryColor}
            onLongPress={restPassword}
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
    height: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 24,
    height: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width,
  },
  buttonView: {
    marginBottom: 25,
  },
});

export default ForgotPasswordScreen;
