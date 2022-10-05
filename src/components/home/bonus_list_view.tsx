import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import uuid from "react-native-uuid";
import { strings } from "../../infrastructure/language/i18n";
import { Bonus } from "../../infrastructure/models/bonus";
import { CashedBonus } from "../../infrastructure/models/cashed_bonus";
import CashedBonusView from "../bonus_details/cashed_bonus_view";
import VoucherView from "./voucher_view";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  noBonusView: {
    flex: 1,
    justifyContent: "center",
  },
  noBonusText: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
  },
});
type IBonusListProps = NativeStackScreenProps<
  TabParamsList,
  TabsNames.obtainable
>;
export type TabParamsList = {
  [TabsNames.obtainable]: {
    bonusList: Bonus[];
  };
  [TabsNames.locked]: {
    bonusList: Bonus[];
  };
  [TabsNames.history]: {
    cashedbonusList: CashedBonus[];
  };
};

export enum TabsNames {
  obtainable = "obtainable",
  locked = "locked",
  history = "history",
}
export const BonusListView: React.FunctionComponent<IBonusListProps> = (
  props,
) => {
  return (
    <View style={styles.container}>
      {props.route.params.bonusList.length > 0 ? (
        <ScrollView>
          {props.route.params.bonusList.map((bonus) => {
            return (
              <VoucherView
                key={uuid.v4().toString()}
                bonus={bonus}
                isHorizontal={false}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.noBonusView}>
          <Text style={styles.noBonusText}>{strings.Label_NoBonuses}</Text>
        </View>
      )}
    </View>
  );
};

type ICashedBonusListProps = NativeStackScreenProps<
  TabParamsList,
  TabsNames.history
>;

export const CashedBonusListView: React.FunctionComponent<
  ICashedBonusListProps
> = (props) => {
  return (
    <View style={styles.container}>
      {props.route.params.cashedbonusList.length > 0 ? (
        <ScrollView>
          {props.route.params.cashedbonusList.map((chashedBonus) => {
            return (
              <CashedBonusView
                key={uuid.v4().toString()}
                cashedBonus={chashedBonus}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.noBonusView}>
          <Text style={styles.noBonusText}>{strings.Label_NoBonuses}</Text>
        </View>
      )}
    </View>
  );
};
