import React, { useContext, useState } from "react";
import debounce from "lodash/debounce";
import styles from "./search.module.css";
import searchIcon from "src/assets/icons/search.svg";
import { LanguageContext } from "src/context/settings";

interface Props {
  onSearch: (text: string) => void;
}

export const Search: React.FC<Props> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>("");

  const languageContext = useContext(LanguageContext);
  const { LanguageState } = languageContext;
  const { translated_text } = LanguageState;

  const debouncedSearch = debounce((text: string) => {
    onSearch(text);
  }, 1000);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    debouncedSearch(text);
  };

  return (
    <div className={styles.search}>
      <form>
        <input
          type="text"
          placeholder={translated_text.search_here_for_your_event}
          value={searchText}
          onChange={handleSearchChange}
        />
        <button type="button">
          <img src={searchIcon} alt="icon" />
        </button>
      </form>
    </div>
  );
};
