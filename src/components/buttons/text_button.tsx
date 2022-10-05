import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type ITextButtonProps = {
  onPress: () => void;
  label: string;
  labelSize: number;
  labelColor: string;
  isExplanationNeeded: boolean;
  explanationLabel: string | undefined;
  explanationLabelColor: string | undefined;
  isDisabled: boolean | null;
};

export const TextButton: React.FC<ITextButtonProps> = (props) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
    },
    buttonText: {
      color: props.labelColor ?? "white",
      fontSize: props.labelSize,
      fontWeight: "700",
      alignItems: "center",
    },
    explanationText: {
      fontSize: props.labelSize,
      color: props.explanationLabelColor ?? "black",
    },
    container: {
      flexDirection: "row",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      {props.isExplanationNeeded ? (
        <Text style={styles.explanationText}>{props.explanationLabel} </Text>
      ) : (
        <React.Fragment />
      )}

      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.isDisabled ?? false}
        style={styles.button}>
        <Text style={styles.buttonText}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};
