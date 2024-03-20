import { LanguageState } from "src/interfaces/language.interface";

type LanguageAction = {
  type: "setLanguage";
  payload: { [key: string]: string };
};

export const languageReducer = (
  state: LanguageState,
  action: LanguageAction
): LanguageState => {
  switch (action.type) {
    case "setLanguage":
      return {
        ...state,
        translated_text: action.payload,
      };
    default:
      return state;
  }
};
