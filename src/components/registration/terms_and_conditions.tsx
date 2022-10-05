import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { strings } from "../../infrastructure/language/i18n";
import { COLORS } from "../../resources/theme";
import { TextButton } from "../buttons/text_button";

export const TermsAndConditions: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    agreeText: {
      letterSpacing: 0.2,
      fontSize: 14,
      color: "#64748B",
      textAlign: "center",
    },
    buttonView: {
      justifyContent: "center",
      flexDirection: "row",
    },
    labelView: {
      color: COLORS.descriptionColor,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.agreeText}>{strings.Label_AgreePolicy}</Text>
      <View style={styles.buttonView}>
        <TextButton
          onPress={() => undefined}
          label={strings.Label_PrivacyPolicy}
          labelSize={14}
          isExplanationNeeded={false}
          explanationLabel={undefined}
          labelColor={"black"}
          explanationLabelColor={undefined}
          isDisabled={false}
        />
        <Text style={styles.labelView}>{`${strings.Label_And}`}</Text>
        <TextButton
          onPress={() => undefined}
          label={strings.Label_TermAndConditions}
          labelSize={14}
          isExplanationNeeded={false}
          explanationLabel={undefined}
          labelColor={"black"}
          explanationLabelColor={undefined}
          isDisabled={null}
        />
      </View>
    </View>
  );
};
