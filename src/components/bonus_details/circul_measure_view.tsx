import * as React from "react";
import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Text } from "react-native";
import { COLORS } from "../../resources/theme";
import * as Progress from "react-native-progress";
import { strings } from "../../infrastructure/language/i18n";

interface ICirculMeasureView {
  total: number;
  userScore: number;
  label: string;
}

const CirculMeasureView: React.FunctionComponent<ICirculMeasureView> = (
  props,
) => {
  const progress: Animated.Value = new Animated.Value(-1);
  const percentage = useRef<number>(-1);
  const [totalUserHas, setTotalUserHas] = React.useState<number>(0);
  const AnimatedProgressCircle = Animated.createAnimatedComponent(
    Progress.Circle,
  );

  useEffect(() => {
    percentage.current = calculateProgess();
    Animated.timing(progress, {
      toValue: percentage.current,
      duration: 300,
      useNativeDriver: false,
    }).start();
  });

  const calculateProgess = (): number => {
    let p: number;
    if (props.userScore < props.total) {
      p = props.userScore / props.total;
      setTotalUserHas(props.userScore);
    } else {
      p = 1;
      setTotalUserHas(props.total);
    }
    return p;
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressView}>
        <AnimatedProgressCircle
          color={COLORS.primaryColor}
          unfilledColor="rgba(0,0,0,0.25)"
          progress={progress}
          size={100}
          showsText={true}
          borderWidth={0}
          thickness={0.5}
          strokeCap={"round"}
        />
      </View>
      <View style={styles.userView}>
        <View style={styles.textView}>
          <Text style={styles.textBig}>{props.label}</Text>
          <Text style={styles.textSmall}>
            {totalUserHas} {strings.Label_OUTOF} {props.total}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  percentage: {
    color: COLORS.descriptionColor,
    fontWeight: "700",
  },
  textSmall: {
    color: COLORS.descriptionColor,
    fontWeight: "300",
  },
  textBig: {
    color: COLORS.primaryColor,
    fontWeight: "300",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressView: {
    padding: 5,
  },
  userView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textView: {
    alignItems: "center",
  },
});

export default CirculMeasureView;
