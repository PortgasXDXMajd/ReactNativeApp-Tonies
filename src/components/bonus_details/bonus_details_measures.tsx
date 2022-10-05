import * as React from "react";
import { StyleSheet, View } from "react-native";
import { strings } from "../../infrastructure/language/i18n";
import { Bonus } from "../../infrastructure/models/bonus";
import { Statistic } from "../../infrastructure/models/statistic";
import CirculMeasureView from "./circul_measure_view";

export interface IBonusDetailsMeasures {
  userStatistic: Statistic;
  bonus: Bonus;
}

const BonusDetailsMeasures: React.FunctionComponent<IBonusDetailsMeasures> = (
  props,
) => {
  return (
    <View style={styles.container}>
      <CirculMeasureView
        total={props.bonus.bonusDistance}
        userScore={props.userStatistic.statisticDistance}
        label={strings.Label_Distance}
      />
      <CirculMeasureView
        total={props.bonus.bonusAltitude}
        userScore={props.userStatistic.statistiAltitude}
        label={strings.Label_Altitude}
      />
      <CirculMeasureView
        total={props.bonus.bonusTourCount}
        userScore={props.userStatistic.statistiTours}
        label={strings.Label_TourCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
});

export default BonusDetailsMeasures;
