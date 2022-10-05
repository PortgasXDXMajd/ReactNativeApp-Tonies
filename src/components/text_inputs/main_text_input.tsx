import * as React from "react";
import { TouchableOpacity, StyleSheet, View, TextInput } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../resources/theme";

type ITextInputProps = {
  onChange: (val: string) => void;
  backgroundColor: string;
  inputColor: string;
  isSecure: boolean;
  hint: string;
  hintColor: string;
  isSuffixNeeded: boolean;
  suffixIconName: string | undefined;
  suffixIconColor: string | undefined;
};

export const MainTextInput: React.FC<ITextInputProps> = (props) => {
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 56,
      paddingVertical: 8,
      paddingLeft: 18,
      paddingRight: 18,
      marginVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: props.backgroundColor,
      borderRadius: 12,
    },

    input: {
      flex: 1,
      color: props.inputColor,
    },
    suffix: {
      alignSelf: "center",
    },
  });

  return (
    <View style={styles.inputContainer}>
      <TextInput
        selectionColor={COLORS.primaryColor}
        style={styles.input}
        onChangeText={props.onChange}
        placeholder={props.hint}
        placeholderTextColor={props.hintColor}
        secureTextEntry={props.isSecure}
      />
      {props.isSuffixNeeded ? (
        <TouchableOpacity style={styles.suffix}>
          <MaterialCommunityIcons
            name={props.suffixIconName ?? "error-outline"}
            color={props.suffixIconColor}
            size={25}
          />
        </TouchableOpacity>
      ) : (
        React.Fragment
      )}
    </View>
  );
};
