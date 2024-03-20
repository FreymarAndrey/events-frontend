import { useReducer } from "react";
import { LanguageState } from "src/interfaces/language.interface";
import { languageReducer } from "./language.reducer";
import { LanguageContext } from "./language.context";
import { CustomStorage } from "src/lib/Storage.ts";
import * as tranlations_en from "src/data/lang/en.json";
import * as tranlations_es from "src/data/lang/es.json";

const INITIAL_STATE: LanguageState = {
  translated_text:
    CustomStorage.language === "en" ? tranlations_en : tranlations_es,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const LanguageProvider = ({ children }: Props) => {
  const [LanguageState, dispatch] = useReducer(languageReducer, INITIAL_STATE);

  const setLanguage = async (language: string) => {
    const traductions: { [key: string]: string } =
      language === "es" ? tranlations_es : tranlations_en;
    CustomStorage.language = language;
    dispatch({ type: "setLanguage", payload: traductions });
  };

  return (
    <LanguageContext.Provider value={{ LanguageState, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
