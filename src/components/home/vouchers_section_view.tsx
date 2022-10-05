import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../infrastructure/language/i18n";
import { ActionTypes } from "../../infrastructure/redux/action_types";
import { StateModel } from "../../infrastructure/redux/reducers";
import { COLORS } from "../../resources/theme";
import { TextButton } from "../buttons/text_button";
import { SizedBox } from "../common/sized_box";
import { RouteNames } from "../navigation/route_names";
import VoucherView from "./voucher_view";
import uuid from "react-native-uuid";

const VouchersSectionView: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = useSelector((state: StateModel) => state.data);

  const handleInnerPressIn = () =>
    dispatch({ type: ActionTypes.SET_OUTTER_SCROLL_VIEW, payload: false });
  const handleInnerPressOut = () =>
    dispatch({ type: ActionTypes.SET_OUTTER_SCROLL_VIEW, payload: true });

  if (data.userBonuses.length == 0) {
    return <React.Fragment />;
  }

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>{strings.Label_Bounces}</Text>
        <TextButton
          isDisabled={false}
          onPress={() => {
            // @ts-ignore
            navigation.navigate(RouteNames.bonusList);
          }}
          label={strings.button_SeeAll}
          labelSize={12}
          labelColor={COLORS.primaryColor}
          isExplanationNeeded={false}
          explanationLabel={undefined}
          explanationLabelColor={undefined}
        />
      </View>
      <SizedBox height={16} width={undefined} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <TouchableWithoutFeedback
          onPressIn={handleInnerPressIn}
          onPressOut={handleInnerPressOut}>
          <View style={styles.voucherContainer}>
            {data.userBonuses.map((bonus) => {
              return (
                <VoucherView
                  key={uuid.v4().toString()}
                  bonus={bonus}
                  isHorizontal={true}
                />
              );
            })}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  label: {
    lineHeight: 22,
    fontSize: 16,
    color: "black",
    fontWeight: "700",
    paddingLeft: 24,
  },
  scrollView: {
    paddingLeft: 24,
  },
  voucherContainer: {
    flexDirection: "row",
    paddingRight: 24,
  },
});

export default VouchersSectionView;
