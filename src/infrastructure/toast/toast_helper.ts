import Toast from "react-native-toast-message";

export enum ToastType {
  success = "success",
  error = "error",
  info = "info",
}

export const showToast = (
  toastType: ToastType,
  heading: string | undefined,
  message: string | undefined,
) => {
  Toast.show({
    type: toastType,
    text1: heading ?? " ",
    text2: message ?? " ",
  });
};
