import LocalizedStrings from "react-native-localization";
import { setData } from "../storage/storage_helper";
import { storageKeys } from "../storage/storage_keys";
import english from "../../resources/lang/en.json";
import deutsch from "../../resources/lang/de.json";

export interface ILanguageModel {
  de: string | null;
  en: string | null;
}

export enum LanguageTag {
  EN = "en",
  DE = "de",
}

export const strings = new LocalizedStrings({
  en: english,
  de: deutsch,
});

export const setInitialLanguage = (lang: string): void => {
  strings.setLanguage(lang);
};

export const toggleLanguage = (lang: string): boolean => {
  strings.setLanguage(lang);
  setData(storageKeys.langKey, lang)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return true;
};

export const getLocaleName = (lang: string, name: ILanguageModel): string => {
  if (lang === LanguageTag.EN) {
    if (name?.en !== null) {
      return name.en;
    } else if (name.de !== null) {
      return name.de;
    } else {
      return "undefined";
    }
  } else {
    if (name.de !== null) {
      return name.de;
    } else if (name.en !== null) {
      return name.en;
    } else {
      return "undefined";
    }
  }
};
