import * as React from "react";
import { useEffect } from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { TextButton } from "../components/buttons/text_button";
import { ExpandedBox } from "../components/common/expanded_box";
import { strings } from "../infrastructure/language/i18n";
import { setData } from "../infrastructure/storage/storage_helper";
import { storageKeys } from "../infrastructure/storage/storage_keys";
import { screenSize, COLORS } from "../resources/theme";
import { walkThroughScreens } from "../resources/walk_through_data";
import { MainButton } from "../components/buttons/main_button";
import { AuthHelper } from "../infrastructure/auth/authentication_helper";
import MyStatusBar from "../components/common/my_status_bar";

const IntroductionScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const scrollX = new Animated.Value(0);

  useEffect(() => {
    setData(storageKeys.isFirstTimeKey, "It is the user first time");
  }, []);

  const renderPages = (): React.ReactElement => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}>
        {walkThroughScreens.map((screen, index) => (
          <ImageBackground
            key={index}
            source={screen.image}
            resizeMode="cover"
            style={styles.screen}>
            <MyStatusBar isTextBlack={false} backgroundColor={"transparent"} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{screen.title}</Text>
            </View>
            <ExpandedBox />
          </ImageBackground>
        ))}
      </Animated.ScrollView>
    );
  };

  const renderDots = (): React.ReactElement => {
    const dotPosition = Animated.divide(scrollX, screenSize.width);
    return (
      <View style={styles.dotsContainer}>
        {walkThroughScreens.map((screen, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [4, 32, 4],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dots,
                styles.iconHeight,
                { width: dotSize, opacity: opacity },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const renderOptions = (): React.ReactElement => {
    return (
      <View>
        <ExpandedBox />
        {renderDots()}
        <View style={styles.mainButtonView}>
          <MainButton
            onPress={() => {
              AuthHelper.login(dispatch);
            }}
            label={strings.label_Login}
            color={COLORS.primaryColor}
            isLoading={false}
          />
        </View>
        <View style={styles.buttonView}>
          <TextButton
            onPress={() => {
              AuthHelper.register();
            }}
            label={strings.label_RegisterNow}
            labelSize={16}
            isExplanationNeeded={true}
            explanationLabel={strings.label_NoAccount}
            labelColor="white"
            explanationLabelColor="white"
            isDisabled={false}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View>{renderPages()}</View>
      <View style={styles.actionStyles}>{renderOptions()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: screenSize.width,
    height: screenSize.height + screenSize.statusBar + 50,
  },
  title: {
    fontSize: 26,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  titleContainer: {
    marginTop: 92,
    paddingHorizontal: 25,
  },
  dotsRootContainer: {
    position: "absolute",
    bottom: "20%",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: screenSize.width,
  },
  actionStyles: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: screenSize.width,
    height: screenSize.height,
  },
  dots: {
    borderRadius: 50,
    marginHorizontal: 2,
    backgroundColor: COLORS.primaryColor,
  },
  buttonView: {
    marginBottom: 42,
    marginTop: 24,
  },
  mainButtonView: {
    width: screenSize.width,
    paddingHorizontal: 24,
  },
  iconHeight: {
    height: 4,
  },
});

export default IntroductionScreen;
