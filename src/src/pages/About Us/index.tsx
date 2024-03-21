import styles from "./about.module.css";
import facebook from "src/assets/icons/facebook.svg";
import twitter from "src/assets/icons/twitter.svg";
import instagram from "src/assets/icons/instagram.svg";
import tiktok from "src/assets/icons/tiktok.svg";

export const AboutUs = () => {
  return (
    <>
      <article className={styles.article_about}>
        <h3>Sobre nosotros</h3>
        <div className={styles.info}>
          <div>
            <h4>Quiénes somos</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              architecto. Modi maiores blanditiis excepturi asperiores.
              Praesentium officiis magnam veritatis culpa eligendi, neque
              voluptas minus quis et voluptatem dolorum, ab hic?
            </p>
          </div>
          <div>
            <h4>Conócenos</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
              sint, harum omnis perspiciatis in a maiores cupiditate at magnam
              voluptatibus laborum, ad voluptatem quis, quibusdam asperiores
              inventore nulla et facere.
            </p>
          </div>
        </div>
        <div className={styles.content_social_networks}>
          <h4>Nuestras redes</h4>
          <div className={styles.container_logos}>
            <div className={styles.logos}>
              <img src={facebook} alt="icon" />
            </div>
            <div className={styles.logos}>
              <img src={instagram} alt="icon" />
            </div>
            <div className={styles.logos}>
              <img src={tiktok} alt="icon" />
            </div>
            <div className={styles.logos}>
              <img src={twitter} alt="icon" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
