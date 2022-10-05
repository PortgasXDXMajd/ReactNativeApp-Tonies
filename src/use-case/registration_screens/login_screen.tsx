import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MainButton } from "../../components/buttons/main_button";
import { TextButton } from "../../components/buttons/text_button";
import { ExpandedBox } from "../../components/common/expanded_box";
import { SizedBox } from "../../components/common/sized_box";
import { renderLoadingData } from "../../components/loader/loading_data";
import { NavigationParamsList } from "../../components/navigation/navigation_param_list";
import { RouteNames } from "../../components/navigation/route_names";
import { AuthHelper } from "../../infrastructure/auth/authentication_helper";
import { strings } from "../../infrastructure/language/i18n";
import { ActionTypes } from "../../infrastructure/redux/action_types";
import { StateModel } from "../../infrastructure/redux/reducers";
import { COLORS, screenSize } from "../../resources/theme";

export type ILoginProps = NativeStackScreenProps<
  NavigationParamsList,
  RouteNames.login
>;

const LoginScreen: React.FunctionComponent<ILoginProps> = (props) => {
  const app = useSelector((state: StateModel) => state.app);
  const dispatch = useDispatch();

  if (app.isAuthStarted) {
    return renderLoadingData();
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.heading}>{strings.label_Login}</Text>
        <Text style={styles.subHeading}>{strings.Label_LoginDescroption}</Text>
        <ExpandedBox />
        <ExpandedBox />
        <View>
          <MainButton
            onPress={() => {
              dispatch({
                type: ActionTypes.AUTH_LOADING_TOGGLE,
              });
              AuthHelper.login(dispatch);
            }}
            label={strings.label_Login}
            color={COLORS.primaryColor}
            onLongPress={() => {
              dispatch({
                type: ActionTypes.AUTH_LOADING_TOGGLE,
              });
              AuthHelper.login(dispatch);
            }}
            isLoading={false}
          />
        </View>
        <SizedBox height={10} width={undefined} />
        <View>
          <TextButton
            isDisabled={false}
            onPress={() => {
              props.navigation.navigate(RouteNames.forgotPassword);
            }}
            label={strings.label_ForgotPassword}
            labelSize={14}
            isExplanationNeeded={false}
            explanationLabel={undefined}
            labelColor={COLORS.primaryColor}
            explanationLabelColor={undefined}
          />
        </View>
        <ExpandedBox />
        <View style={styles.loadingView}>
          <TextButton
            isDisabled={false}
            onPress={() => {
              dispatch({
                type: ActionTypes.AUTH_LOADING_TOGGLE,
              });
              AuthHelper.register();
            }}
            label={strings.label_RegisterNow}
            labelSize={14}
            isExplanationNeeded={true}
            explanationLabel={strings.label_NoAccount}
            labelColor={COLORS.primaryColor}
            explanationLabelColor="black"
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
  heading: {
    color: "black",
    fontSize: 24,
    height: 35,
    fontWeight: "700",
    marginTop: 108,
  },
  subHeading: {
    color: COLORS.descriptionColor,
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
    maxWidth: 327,
  },
  loadingView: {
    marginBottom: 25,
  },
});

export default LoginScreen;
