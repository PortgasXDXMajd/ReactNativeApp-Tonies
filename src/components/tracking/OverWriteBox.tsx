import * as React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { strings } from "../../infrastructure/language/i18n";
import { COLORS } from "../../resources/theme";

interface OverWriteBoxProps {
  readonly isSelected: boolean;
  readonly setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    color: "black",
    lineHeight: 20,
  },
});

export const OverWriteBox: React.FunctionComponent<OverWriteBoxProps> = ({
  setIsSelected,
  isSelected,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsSelected(!isSelected);
      }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>{strings.Label_OverWriteLocation}</Text>
        </View>
        <View>
          <CheckBox
            tintColors={{ true: COLORS.primaryColor, false: "#aaaaaa" }}
            boxType={"circle"}
            onCheckColor={COLORS.primaryColor}
            disabled={false}
            value={isSelected}
            onValueChange={(newValue) => setIsSelected(newValue)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
