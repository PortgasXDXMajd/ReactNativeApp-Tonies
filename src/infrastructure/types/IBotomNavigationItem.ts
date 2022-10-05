import { FunctionComponent } from "react";
import { ImageProps } from "react-native";

export interface IBottomNavigationItem {
  label: string;
  icon: ImageProps;
  component: FunctionComponent;
}
