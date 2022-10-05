import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MainAppBar } from "../../../components/app_bar/main_app_bar";
import {
  BonusListView,
  CashedBonusListView,
  TabParamsList,
  TabsNames,
} from "../../../components/home/bonus_list_view";
import { renderLoadingData } from "../../../components/loader/loading_data";
import { BonusesController } from "../../../infrastructure/axios/bonus_controller";
import { checkIfUserHaveEnoughCreditToRedeemBonus } from "../../../infrastructure/bonus/bonus_helper";
import { strings } from "../../../infrastructure/language/i18n";
import { Bonus } from "../../../infrastructure/models/bonus";
import {
  CashedBonus,
  IGetCashedBonus,
} from "../../../infrastructure/models/cashed_bonus";
import { Statistic } from "../../../infrastructure/models/statistic";
import { ActionTypes } from "../../../infrastructure/redux/action_types";
import { StateModel } from "../../../infrastructure/redux/reducers";
import { COLORS } from "../../../resources/theme";

const Tab = createMaterialTopTabNavigator<TabParamsList>();

const BonusListScreen: React.FunctionComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const app = useSelector((state: StateModel) => state.app);
  const data = useSelector((state: StateModel) => state.data);
  const [isLoadingBonuses, setIsLoadingBonuses] = useState<boolean>(true);
  const cashedBonuses: CashedBonus[] = [];
  const lockedBonuses: Bonus[] = [];
  const obtainableBonuses: Bonus[] = [];

  useEffect(() => {
    splitBonuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCashedBonuses = async () => {
    const bonusController: BonusesController = new BonusesController(
      app.accessToken,
    );
    const result: IGetCashedBonus[] | undefined =
      await bonusController.getCashedBonus(app.user?.userId ?? "");
    if (result !== undefined) {
      result.map((jsonRide: IGetCashedBonus) =>
        cashedBonuses.push(CashedBonus.fromJson(jsonRide)),
      );
      dispatch({
        type: ActionTypes.SET_CASHED_BONUS_LIST,
        payload: cashedBonuses.reverse(),
      });
    }
    setIsLoadingBonuses(false);
  };

  const splitBonuses = () => {
    data.userBonuses.map((bonus) => {
      if (
        checkIfUserHaveEnoughCreditToRedeemBonus(
          bonus,
          data.userLatestStatistic as Statistic,
        )
      ) {
        obtainableBonuses.push(bonus);
      } else {
        lockedBonuses.push(bonus);
      }
    });
    dispatch({
      type: ActionTypes.SET_OBTAINABLE_BONUS_LIST,
      payload: obtainableBonuses,
    });
    dispatch({
      type: ActionTypes.SET_LOCKED_BONUS_LIST,
      payload: lockedBonuses,
    });
    getCashedBonuses();
  };

  if (isLoadingBonuses) {
    return renderLoadingData();
  }

  return (
    <View style={styles.container}>
      <MainAppBar
        title={strings.BonusesOverview}
        goBack={() => {
          navigation.goBack();
        }}
        titleColor={"white"}
        color={null}
        backIconColor={null}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarBounces: true,
          tabBarIndicatorStyle: { backgroundColor: COLORS.primaryColor },
          tabBarLabelStyle: { fontSize: 12, color: COLORS.primaryColor },
          tabBarStyle: { backgroundColor: "white" },
        }}>
        <Tab.Screen
          name={TabsNames.obtainable}
          component={BonusListView}
          initialParams={{ bonusList: data.userObtainableBonuses }}
        />
        <Tab.Screen
          name={TabsNames.locked}
          component={BonusListView}
          initialParams={{ bonusList: data.userLockedBonuses }}
        />
        <Tab.Screen
          name={TabsNames.history}
          component={CashedBonusListView}
          initialParams={{ cashedbonusList: data.userCashedBonuses }}
        />
      </Tab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
  },
});
export default BonusListScreen;
