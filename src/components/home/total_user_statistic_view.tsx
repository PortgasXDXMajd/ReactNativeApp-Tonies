import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";
import { useSelector } from "react-redux";
import { strings } from "../../infrastructure/language/i18n";
import { formatNumber } from "../../infrastructure/number/big_numbers_helper";
import { StateModel } from "../../infrastructure/redux/reducers";
import { screenSize } from "../../resources/theme";
import { SizedBox } from "../common/sized_box";

const TotalUserStatisticView: React.FunctionComponent = () => {
  const data = useSelector((state: StateModel) => state.data);

  if (data.userTotalStatistic === undefined) {
    return <React.Fragment />;
  }

  return (
    <View style={styles.goodDeedContainer}>
      <Text style={styles.label}>{strings.Label_YourGoodDeedToTheWorld}</Text>
      <SizedBox height={16} width={undefined} />
      <ImageBackground
        resizeMode="cover"
        style={styles.totalStatisticContainer}
        imageStyle={styles.imageView}
        source={require("../../resources/assets/dummy_images/default-statistic-image.png")}>
        <View style={styles.totalStatisticBottomContainer}>
          <View>
            <Text style={styles.label_Saving}>
              {strings.Label_YouSavedTrees}
            </Text>
          </View>
          <SizedBox height={10} width={undefined} />
          <View style={styles.statisticContainer}>
            <View style={styles.iconView}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../resources/assets/statistic/ic_bike.png")}
              />
              <Text style={styles.Label}>
                {data.userTotalStatistic.statistiTours} {strings.Label_Tours}
              </Text>
            </View>
            <View style={styles.iconView}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../resources/assets/statistic/ic_distance.png")}
              />
              <Text style={styles.Label}>
                {formatNumber(data.userTotalStatistic.statisticDistance / 1000)}{" "}
                km
              </Text>
            </View>
            <View style={styles.iconView}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require("../../resources/assets/statistic/ic_altitude.png")}
              />
              <Text style={styles.Label}>
                {formatNumber(
                  Math.round(data.userTotalStatistic.statistiAltitude / 1000),
                )}{" "}
                km
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
  label: {
    lineHeight: 22,
    fontSize: 16,
    color: "black",
    fontWeight: "700",
    paddingLeft: 24,
  },
  label_Saving: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  },
  totalStatisticContainer: {
    height: screenSize.width / 2,

    marginHorizontal: 24,
  },
  goodDeedContainer: {},
  totalStatisticBottomContainer: {
    position: "absolute",
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    width: "100%",
    bottom: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    borderColor: "000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    paddingHorizontal: 24,
  },
  Label: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    marginLeft: 5,
  },
  imageView: {
    borderRadius: 12,
  },
  statisticContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TotalUserStatisticView;
