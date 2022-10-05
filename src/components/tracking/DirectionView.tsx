import * as React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import { API_KEY } from "../../infrastructure/google_map/map_helper";
import { StateModel } from "../../infrastructure/redux/reducers";
import { ILocationPoint } from "../../infrastructure/types/ILocationPoint";
import { COLORS, screenSize } from "../../resources/theme";

interface DirectionViewProps {
  readonly origin: ILocationPoint | undefined;
  readonly destination: ILocationPoint | undefined;
  readonly mapview: MapView | undefined;
}

const DirectionViewComp: React.FunctionComponent<DirectionViewProps> = ({
  origin,
  destination,
  mapview,
}) => {
  const [IsShowRoute, setShowRoute] = React.useState<boolean>(false);

  const lang = useSelector((state: StateModel) => state.app.lang);

  const checkHomeAndWorkLocation = React.useCallback(() => {
    if (
      origin !== undefined &&
      destination !== undefined &&
      origin?.latitude !== destination?.latitude &&
      origin?.longitude !== destination?.longitude
    ) {
      setShowRoute(true);
    } else {
      setShowRoute(false);
    }
  }, [origin, destination]);

  React.useEffect(() => {
    checkHomeAndWorkLocation();
  }, [checkHomeAndWorkLocation]);

  return (
    <View>
      {IsShowRoute ? (
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={API_KEY}
          strokeWidth={4}
          mode="BICYCLING"
          language={lang}
          strokeColor={COLORS.descriptionColor}
          onStart={() => {
            return;
          }}
          onReady={(result) => {
            if (mapview != undefined) {
              mapview.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: screenSize.width / 20,
                  bottom: (screenSize.height * 0.45) / 20,
                  left: screenSize.width / 20,
                  top: (screenSize.height * 0.45) / 20,
                },
              });
            }
          }}
          onError={() => {
            return;
          }}
        />
      ) : (
        <React.Fragment />
      )}
    </View>
  );
};

export const DirectionView = React.memo(DirectionViewComp);
