import { LanguageContext } from "src/context/settings";
import styles from "./forgot.module.css";
import { useContext } from "react";

export const Forgot = () => {
  const languageContext = useContext(LanguageContext);
  const { LanguageState } = languageContext;
  const { translated_text } = LanguageState;

  return (
    <>
      <article className={styles.article_forgot}>
        <h4>{translated_text.password_recovery}</h4>
        <section>
          <form>
            <label>
              {translated_text.enter_your_email_or_ID_to_receive_a_new_password}
            </label>
            <input type="text" />
            <button> {translated_text.send}</button>
          </form>
        </section>
      </article>
    </>
  );
};
