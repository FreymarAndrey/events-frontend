import { Link } from "react-router-dom";
import styles from "./cart.module.css";

export const Cart = () => {
  return (
    <>
      <article className={styles.content_cart}>
        <h3>Upss tu carrito de compras esta vació</h3>
        <p>
          navega por la web y has tus compras{" "}
          <Link to={"/"}>
            <small>ir a la web</small>
          </Link>
        </p>
      </article>
    </>
  );
};
