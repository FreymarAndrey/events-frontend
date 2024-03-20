import { useContext } from "react";
import styles from "./footer.module.css";
import { LanguageContext } from "src/context/settings";

export const Footer = () => {
  const languageContext = useContext(LanguageContext);
  const { LanguageState } = languageContext;
  const { translated_text } = LanguageState;

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container_top}>
          <h4>{translated_text.attenment_client}</h4>
          <p>correo@correo.com</p>
        </div>
        <div className={styles.container_bottom}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p>
            {translated_text.shop_by} <small>project-x</small>
          </p>
        </div>
      </footer>
    </>
  );
};
