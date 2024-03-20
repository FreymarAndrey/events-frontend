import { createContext } from "react";
import { LanguageState } from "src/interfaces/language.interface";

export type LanguageContextProps = {
  LanguageState: LanguageState;
  setLanguage: (payload: string) => void;
};

export const LanguageContext = createContext<LanguageContextProps>(
  {} as LanguageContextProps
);
