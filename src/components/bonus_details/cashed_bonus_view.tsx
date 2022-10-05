import moment from "moment";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { strings } from "../../infrastructure/language/i18n";
import { CashedBonus } from "../../infrastructure/models/cashed_bonus";
import { COLORS, screenSize } from "../../resources/theme";

interface ICashedBonusView {
  cashedBonus: CashedBonus;
}

const CashedBonusView: React.FunctionComponent<ICashedBonusView> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.cashedBonus.bonus_title}</Text>
      <View style={styles.cashDateView}>
        <Text>{strings.CashingDate}</Text>
        <Text>
          {moment(props.cashedBonus.cashDate).format("D.M.YYYY - HH:mm")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.descriptionColor,
    margin: 5,
    width: screenSize.width - 10,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  cashDateView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CashedBonusView;
