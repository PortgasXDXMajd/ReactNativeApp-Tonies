import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";
import { MainAppBar } from "../../../components/app_bar/main_app_bar";
import { MainButton } from "../../../components/buttons/main_button";
import { ExpandedBox } from "../../../components/common/expanded_box";
import MyStatusBar from "../../../components/common/my_status_bar";
import { MainTextInput } from "../../../components/text_inputs/main_text_input";
import {
  ChallengeController,
  ICreateChallenge,
} from "../../../infrastructure/axios/challenge_controller";
import { strings } from "../../../infrastructure/language/i18n";
import { StateModel } from "../../../infrastructure/redux/reducers";
import { COLORS, screenSize } from "../../../resources/theme";
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import { BottomSheet, ListItem } from "react-native-elements";
import IconButton from "../../../components/buttons/icon_button";
import { SizedBox } from "../../../components/common/sized_box";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  showToast,
  ToastType,
} from "../../../infrastructure/toast/toast_helper";

const ChallengeCreationScreen: React.FunctionComponent = () => {
  const app = useSelector((state: StateModel) => state.app);
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [challengeName, setChallengeName] = useState<string | undefined>(
    undefined,
  );
  const [challengeDescription, setChallengeDescription] = useState<
    string | undefined
  >(undefined);
  const [challengeImages, setChallengeImages] = useState<Asset[] | undefined>(
    undefined,
  );
  const [challengeNameError, setChallengeNameError] = useState<
    string | undefined
  >(undefined);
  const [challengeDescriptionError, setChallengeDescriptionError] = useState<
    string | undefined
  >(undefined);

  const createChallenge = async () => {
    setisLoading(true);
    const challengeController: ChallengeController = new ChallengeController(
      app.accessToken,
    );

    const newChallenge: ICreateChallenge = {
      name: challengeName as string,
      description: challengeDescription as string,
      image_path: "image",
    };

    const result: boolean = await challengeController.createChallenge(
      newChallenge,
    );

    setisLoading(false);

    if (result) {
      navigation.goBack();
    }
  };
  const validateForm = () => {
    let isValid = true;
    if (challengeName === undefined || challengeName.trim() == "") {
      setChallengeNameError("Please enter a name for the challenge");
      isValid = false;
    } else {
      setChallengeNameError(undefined);
    }

    if (
      challengeDescription === undefined ||
      challengeDescription.trim() == ""
    ) {
      setChallengeDescriptionError(
        "Please enter a description for the challenge",
      );
      isValid = false;
    } else {
      setChallengeDescriptionError(undefined);
    }

    if (isValid) {
      createChallenge();
    }
  };

  const takeImageFromCamera = async () => {
    setIsVisible(false);
    await launchCamera({ mediaType: "photo" })
      .then((resultImage) => {
        setChallengeImages(resultImage.assets);
      })
      .catch((error) => {
        showToast(ToastType.error, "Camera Error", error);
      });
  };
  const takeImageFromPhotos = async () => {
    setIsVisible(false);
    await launchImageLibrary({ mediaType: "photo" })
      .then((resultImage) => {
        setChallengeImages(resultImage.assets);
      })
      .catch((error) => {
        showToast(ToastType.error, "Photo Library Error", error);
      });
  };
  const list = [
    {
      title: strings.Label_Camera,
      containerStyle: {
        backgroundColor: COLORS.descriptionColor,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      },
      onPress: takeImageFromCamera,
      icon: require("../../../resources/assets/icons/ic_camera.png"),
    },
    {
      title: strings.Label_Photo,
      containerStyle: { backgroundColor: COLORS.descriptionColor },
      onPress: takeImageFromPhotos,
      icon: require("../../../resources/assets/icons/ic_photoLibrary.png"),
    },
  ];

  return (
    <View style={styles.outterScreen}>
      <MyStatusBar isTextBlack={true} backgroundColor={COLORS.white} />
      <MainAppBar
        title={""}
        titleColor={COLORS.white}
        goBack={() => {
          navigation.goBack();
        }}
        color={COLORS.white}
        backIconColor={COLORS.black}
      />
      <View style={styles.innerScreen}>
        <View>
          <Text style={styles.bigText}>{strings.Label_CreateChallenge}</Text>
          <Text style={styles.smallText}>
            {strings.Label_CreateChallengeDescription}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <MainTextInput
            onChange={(val: string) => {
              setChallengeName(val);
            }}
            backgroundColor={COLORS.textInputBackground}
            inputColor={COLORS.black}
            isSecure={false}
            hint={strings.ChallengeTitle}
            hintColor={COLORS.descriptionColor}
            isSuffixNeeded={false}
            suffixIconName={undefined}
            suffixIconColor={undefined}
          />

          {challengeNameError !== undefined ? (
            <Text style={styles.error}>{challengeNameError}</Text>
          ) : (
            React.Fragment
          )}

          <MainTextInput
            onChange={(val: string) => {
              setChallengeDescription(val);
            }}
            backgroundColor={COLORS.textInputBackground}
            inputColor={COLORS.black}
            isSecure={false}
            hint={strings.ChallengeDescription}
            hintColor={COLORS.descriptionColor}
            isSuffixNeeded={false}
            suffixIconName={undefined}
            suffixIconColor={undefined}
          />

          {challengeDescriptionError !== undefined ? (
            <Text style={styles.error}>{challengeDescriptionError}</Text>
          ) : (
            React.Fragment
          )}

          <TouchableWithoutFeedback
            onPress={() => {
              setIsVisible(!isVisible);
            }}>
            <View style={styles.imagePickerContainer}>
              <Text style={{ color: COLORS.descriptionColor }}>
                {challengeImages !== undefined
                  ? `${challengeImages[0].fileName?.slice(0, 5)}` +
                    ` -- ` +
                    `${challengeImages[0].type}`
                  : strings.Label_SelectImage}
              </Text>
              <MaterialCommunityIcons
                name={"upload"}
                color={COLORS.primaryColor}
                size={25}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ExpandedBox />
        <View style={styles.buttonContainer}>
          <MainButton
            isLoading={isLoading}
            onPress={validateForm}
            label={strings.LabelSave}
            color={COLORS.primaryColor}
          />
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsVisible(false);
        }}>
        <BottomSheet modalProps={{}} isVisible={isVisible}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              containerStyle={item.containerStyle}
              onPress={item.onPress}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}>
              <ListItem.Content>
                <View style={styles.container}>
                  <IconButton icon={item.icon} onPress={item.onPress} />
                  <SizedBox height={undefined} width={15} />
                  <ListItem.Title style={styles.buttomSheetTitleStyle}>
                    {item.title}
                  </ListItem.Title>
                </View>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  outterScreen: {
    flex: 1,
    backgroundColor: "white",
  },
  innerScreen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
  },
  bigText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "400",
    color: "black",
  },
  smallText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
    color: COLORS.descriptionColor,
  },
  inputContainer: {
    marginTop: screenSize.height * 0.08,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  error: {
    fontSize: 12,
    fontWeight: "300",
    lineHeight: 15,
    color: COLORS.error,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  buttomSheetTitleStyle: {
    color: "white",
    fontSize: 15,
  },
  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    paddingVertical: 8,
    paddingLeft: 18,
    paddingRight: 18,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 12,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ChallengeCreationScreen;
