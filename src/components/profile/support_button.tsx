import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../resources/theme";
import Icon from "react-native-vector-icons/FontAwesome5";
type ISupportButtonProps = {
  onPress?: () => void;
  label: string;
};

export const SupportButton: React.FC<ISupportButtonProps> = (props) => {
  const styles = StyleSheet.create({
    buttonView: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 20,
      marginTop: 20,
    },
    textStyle: {
      flex: 1,
      color: COLORS.black,
      fontWeight: "bold",
    },
  });
  return (
    <TouchableOpacity style={styles.buttonView} onPress={props.onPress}>
      <Text style={styles.textStyle}>{props.label}</Text>
      <Icon color={COLORS.descriptionColor} size={20} name={"chevron-right"} />
    </TouchableOpacity>
  );
};
