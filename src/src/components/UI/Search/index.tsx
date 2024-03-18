import React from "react";
import styles from "./search.module.css";
import searchIcon from "src/assets/icons/search.svg";

interface Props {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<Props> = ({ setSearchText }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className={styles.search}>
        <div>
          <input
            type="text"
            placeholder="Busca aquí tu evento..."
            onChange={handleSearchChange}
          />
          <button type="button">
            <img src={searchIcon} alt="icon" />
          </button>
        </div>
      </div>
    </>
  );
};
