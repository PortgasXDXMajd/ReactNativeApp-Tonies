import { ImageProps } from "react-native-elements";
import { strings } from "../infrastructure/language/i18n";

export interface IWalkThroughScreen {
  image: ImageProps;
  title: string;
}

export const walkThroughScreens: IWalkThroughScreen[] = [
  {
    image: require("./assets/introPics/pic1.jpg"),
    title: strings.Label_intro1,
  },

  {
    image: require("./assets/introPics/pic2.jpg"),
    title: strings.Label_intro2,
  },
];
