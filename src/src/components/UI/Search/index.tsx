import React, { useState } from "react";
import debounce from "lodash/debounce";
import styles from "./search.module.css";
import searchIcon from "src/assets/icons/search.svg";

interface Props {
  onSearch: (text: string) => void;
}

export const Search: React.FC<Props> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>("");

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
      <div>
        <input
          type="text"
          placeholder="Busca aquí tu evento..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <button type="button">
          <img src={searchIcon} alt="icon" />
        </button>
      </div>
    </div>
  );
};
