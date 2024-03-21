import Logo from "../../../assets/logo.webp";
import Cart from "../../../assets/icons/cart-fill-svgrepo-com.svg";
import Profile from "../../../assets/icons/profile.svg";
import styles from "./navbar.module.css";
import { LanguageContext } from "src/context/settings";
import { ChangeEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { publicRoutes } from "src/models";

export const Navbar = () => {
  const languageContext = useContext(LanguageContext);
  const { LanguageState, setLanguage } = languageContext;
  const { translated_text } = LanguageState;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value: string = event.target.value;
    const { name } = event.target;
    if (name === "language") setLanguage(value);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navigation}>
          <Link to="/">
            <img src={Logo} alt="icon" />
          </Link>

          <p className={styles.text_left}>
            {translated_text.store}
            <br />
            {translated_text.photo}
          </p>
          <Link to="/">
            <p> {translated_text.events}</p>
          </Link>
          <Link to={"/" + publicRoutes.ABOUTUS}>
            <p> {translated_text.about_us}</p>
          </Link>
        </div>
        <div className={styles.actions}>
          <Link to={"/" + publicRoutes.MYORDERS}>
            <button>{translated_text.my_orders}</button>
          </Link>

          <div>
            <Link to={"/" + publicRoutes.LOGIN}>
              <img src={Profile} alt="icon" />
            </Link>
          </div>
          <div>
            <img src={Cart} alt="icon" />
          </div>

          <select
            onChange={handleChange}
            value={translated_text.language}
            name="language"
            id="language"
          >
            <option value="es">Es</option>
            <option value="en">En</option>
          </select>
        </div>
      </nav>
    </>
  );
};
