import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container_top}>
          <h4>Atención al cliente</h4>
          <p>correo@correo.com</p>
        </div>
        <div className={styles.container_bottom}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p>
            Tienda por: <small>project-x</small>
          </p>
        </div>
      </footer>
    </>
  );
};
