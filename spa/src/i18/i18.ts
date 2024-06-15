import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./i18_en.json";
import translationMK from "./i18_mk.json";

export enum LANGUAGE {
  EN = "en",
  MK = "mk",
}

const languageStorageKey = "language";

const resources = {
  en: {
    translation: translationEN,
  },
  mk: {
    translation: translationMK,
  },
};

const language = localStorage.getItem(languageStorageKey);
if (language === null) {
  localStorage.setItem(languageStorageKey, "en");
}

export const updateLanguage = (language: LANGUAGE): void => {
  i18n
    .changeLanguage(language)
    .then(() => localStorage.setItem(languageStorageKey, language))
    .catch((e) => console.error("Failed switching language. ", e));
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language ?? "en",
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
