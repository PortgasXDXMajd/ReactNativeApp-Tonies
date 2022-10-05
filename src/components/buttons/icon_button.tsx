import * as React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";

interface IIconButton {
  onPress: () => void;
  icon: ImageSourcePropType;
}

const IconButton: React.FunctionComponent<IIconButton> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.icon}>
        <Image source={props.icon} style={styles.iconSize} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    backgroundColor: "rgba(248, 250, 252, 1)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  iconSize: {
    width: 20,
    height: 20,
  },
});

export default IconButton;
