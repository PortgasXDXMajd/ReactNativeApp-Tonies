import * as React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { COLORS } from "../../resources/theme";
import Icon from "react-native-vector-icons/FontAwesome5";
type ISelectLocationButtonProps = {
  onPress: () => void;
  label: string;
  icon: ImageSourcePropType;
};

export const SelectLocationButton: React.FC<ISelectLocationButtonProps> = (
  props,
) => {
  const styles = StyleSheet.create({
    buttonView: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 20,
      marginTop: 20,
    },
    iconView: {
      width: 50,
      height: 50,
    },
    textStyle: {
      flex: 1,
      color: COLORS.black,
      marginLeft: 10,
    },
  });
  return (
    <TouchableOpacity style={styles.buttonView} onPress={props.onPress}>
      <Image
        source={props.icon}
        style={styles.iconView}
        resizeMode="center"
        resizeMethod="resize"
      />
      <Text style={styles.textStyle}>{props.label}</Text>
      <Icon color={COLORS.descriptionColor} size={20} name={"chevron-right"} />
    </TouchableOpacity>
  );
};
