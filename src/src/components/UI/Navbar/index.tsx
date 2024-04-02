import Logo from "../../../assets/logo.webp";
import Cart from "../../../assets/icons/cart-fill-svgrepo-com.svg";
import Profile from "../../../assets/icons/profile.svg";
import styles from "./navbar.module.css";
import { LanguageContext } from "src/context/settings";
import { ChangeEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { publicRoutes } from "src/models";

export const Navbar = () => {
  const languageContext = useContext(LanguageContext);
  const { LanguageState, setLanguage } = languageContext;
  const { translated_text } = LanguageState;
  const [showMenu, setShowMenu] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value: string = event.target.value;
    const { name } = event.target;
    if (name === "language") setLanguage(value);
  };

  const reload = () => {
    setTimeout(() => {
      location.reload();
    }, 300);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      <nav className={styles.nav}>
        <section>
          <div className={styles.navigation}>
            <Link to={"/"} onClick={reload}>
              <img src={Logo} alt="icon" />
            </Link>

            <p className={styles.text_left}>
              {translated_text.store}
              <br />
              {translated_text.photo}
            </p>
            <Link to={"/"} onClick={reload}>
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
              <Link to={"/" + publicRoutes.MYORDERS}>
                <img src={Cart} alt="icon" />
              </Link>
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
          <div className={styles.menu_mobile}>
            <Link to={"/" + publicRoutes.MYORDERS}>
              <img className={styles.cart} src={Cart} alt="icon-cart" />
            </Link>

            <div className={styles.menu} onClick={toggleMenu}></div>
          </div>
        </section>

        <div className={styles.mobile}>
          {showMenu && (
            <div className={styles.option_menu}>
              <Link to={"/"} onClick={reload}>
                <p> {translated_text.events}</p>
              </Link>
              <Link to={"/" + publicRoutes.LOGIN} onClick={closeMenu}>
                <p>{translated_text.log_in}</p>
              </Link>
              <Link to={"/" + publicRoutes.MYORDERS} onClick={closeMenu}>
                <p>{translated_text.my_orders}</p>
              </Link>
              <select
                onChange={handleChange}
                value={translated_text.language}
                className={styles.select}
                name="language"
                onClick={closeMenu}
                id="language"
              >
                <option value="es">Es</option>
                <option value="en">En</option>
              </select>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
