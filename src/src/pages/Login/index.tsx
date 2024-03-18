import styles from "./login.module.css";

export const Login = () => {
  return (
    <>
      <article className={styles.login}>
        <div className={styles.header}>
          <h3> Inicia sesión</h3>
          <p>
            ¿Aún no tienes cuenta? <a href="#">has clic aquí</a>
          </p>
        </div>
        <div className={styles.form}>
          <form className={styles.form_login}>
            <div>
              <label>Ingresa tu correo de acceso</label>
              <input type="text" />
            </div>
            <div>
              <label>Ingresa tu contraseña</label>
              <input type="text" />
            </div>
            <div className={styles.actions}>
              <label>
                <input type="checkbox" />
                guardar acceso
              </label>
              <div>
                <a href="#">Primer acceso?</a>
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.buttons}>
          <button className={styles.cod}>Codigó de acceso</button>
          <button className={styles.start}>Iniciar sesión</button>
        </div>
      </article>
    </>
  );
};
