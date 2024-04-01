import { publicRoutes } from "src/models";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { LanguageContext } from "src/context/settings";
import { useContext } from "react";

export const Login = () => {
  const languageContext = useContext(LanguageContext);
  const { LanguageState } = languageContext;
  const { translated_text } = LanguageState;

  return (
    <>
      <article className={styles.login}>
        <div className={styles.header}>
          <h3> {translated_text.log_in}</h3>
          <p>
            {translated_text.dont_have_an_account_yet}{" "}
            <a href="#">{translated_text.click_here}</a>
          </p>
        </div>
        <div className={styles.form}>
          <form className={styles.form_login}>
            <div>
              <label>{translated_text.Enter_your_login_email}</label>
              <input type="text" />
            </div>
            <div>
              <label>{translated_text.Enter_your_password}</label>
              <input type="text" />
            </div>
            <div className={styles.actions}>
              <label>
                <input type="checkbox" />
                {translated_text.remember_password}
              </label>
              <div>
                <Link to={"/" + publicRoutes.FORGOT}>
                  {translated_text.forgot_your_password}
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.buttons}>
          <button className={styles.cod}>{translated_text.access_code}</button>
          <button className={styles.start}>{translated_text.log_in}</button>
        </div>
      </article>
    </>
  );
};
