import * as React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { StateModel } from "../../infrastructure/redux/reducers";
import RideView from "./ride_view";

export const LatestRides: React.FunctionComponent = () => {
  const userRides = useSelector((state: StateModel) => state.data.userRides);
  return (
    <View>
      {userRides.slice(0, 10).map((ride) => {
        return <RideView key={ride.rideId} ride={ride} />;
      })}
    </View>
  );
};
