import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackNavigator } from "./components/navigation/root_stack_navigator";
import { store } from "./infrastructure/redux/store";
import { Provider } from "react-redux";
import MyStatusBar from "./components/common/my_status_bar";
import Toast from "react-native-toast-message";

export const App: React.FunctionComponent = () => {
  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <MyStatusBar isTextBlack={true} backgroundColor={"transparent"} />
            <RootStackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
      <Toast />
    </>
  );
};
