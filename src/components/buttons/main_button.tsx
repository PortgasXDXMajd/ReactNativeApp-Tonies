import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../../resources/theme";

type IMainButtonProps = {
  onPress: () => void;
  onLongPress?: () => void;
  label: string;
  color: string;
  isLoading: boolean;
};

export const MainButton: React.FC<IMainButtonProps> = (props) => {
  const styles = StyleSheet.create({
    mainButton: {
      backgroundColor: props.color ?? COLORS.primaryColor,
      alignItems: "center",
      paddingVertical: 17,
      borderRadius: 12,
      shadowColor: "#000",
      borderColor: "000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      height: 22,
      fontWeight: "700",
    },
  });

  return (
    <TouchableOpacity
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      style={styles.mainButton}>
      {
        <Text style={styles.buttonText}>
          {!props.isLoading ? props.label : `Please wait...`}
        </Text>
      }
    </TouchableOpacity>
  );
};
