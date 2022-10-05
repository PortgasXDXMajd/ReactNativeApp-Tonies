import * as React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { strings } from "../../infrastructure/language/i18n";
import { StateModel } from "../../infrastructure/redux/reducers";
import RideView from "./ride_view";

const RidesSectionView: React.FunctionComponent = () => {
  const userRides = useSelector((state: StateModel) => state.data.userRides);

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.Lable}>{strings.Label_YourRides}</Text>
            <React.Fragment />
          </>
        }
        data={userRides}
        renderItem={({ item }) => <RideView key={item.rideId} ride={item} />}
        keyExtractor={(item) => item.rideId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Lable: {
    lineHeight: 22,
    fontSize: 16,
    color: "black",
    fontWeight: "700",
    paddingLeft: 24,
  },
});

export default RidesSectionView;
