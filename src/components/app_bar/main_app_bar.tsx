import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, screenSize } from "../../resources/theme";
import { BackButton } from "../buttons/back_button";
import { SizedBox } from "../common/sized_box";

interface IAppBarProps {
  title: string;
  goBack: () => void;
  titleColor: string;
  color: string | null;
  backIconColor: string | null;
}

export const MainAppBar: React.FunctionComponent<IAppBarProps> = (props) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      marginTop: screenSize.statusBar,
      paddingLeft: 15,
      height: screenSize.appBar,
      backgroundColor: props.color ?? COLORS.primaryColor,
    },
    heading: {
      color: props.titleColor ?? "black",
      fontSize: 22,
      height: 35,
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.container}>
      <BackButton
        onPress={props.goBack}
        isAbsoluteLocation={false}
        iconColor={props.backIconColor ?? "white"}
      />
      <SizedBox height={undefined} width={15} />
      <Text style={styles.heading}>{props.title}</Text>
    </View>
  );
};
