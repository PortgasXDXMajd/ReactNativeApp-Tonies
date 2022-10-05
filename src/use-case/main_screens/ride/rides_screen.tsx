import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import RidesSectionView from "../../../components/home/rides_section_view";
import { StateModel } from "../../../infrastructure/redux/reducers";
import { screenSize } from "../../../resources/theme";

const RidesScreen: React.FunctionComponent = () => {
  const app = useSelector((state: StateModel) => state.app);

  if (app.isGettingData) {
    return <React.Fragment />;
  }

  return (
    <View style={styles.screen}>
      <RidesSectionView />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: screenSize.statusBar + 25,
  },
});

export default RidesScreen;
