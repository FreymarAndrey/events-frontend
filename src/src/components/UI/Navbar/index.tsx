import Logo from "../../../assets/icons/logo.jpg";
import Cart from "../../../assets/icons/cart-fill-svgrepo-com.svg";
import Profile from "../../../assets/icons/profile.svg";
import styles from "./navbar.module.css";

export const Navbar = () => {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navigation}>
          <img src={Logo} alt="icon" />
          <p className={styles.text_left}>
            Tienda
            <br />
            Fotográfica
          </p>
          <p>Eventos</p>
          <p>Nosotros</p>
        </div>
        <div className={styles.actions}>
          <button>Mis compras</button>
          <div>
            <img src={Cart} alt="icon" />
          </div>
          <div>
            <img src={Profile} alt="icon" />
          </div>

          <select>
            <option>Es</option>
            <option>En</option>
          </select>
        </div>
      </nav>
    </>
  );
};
