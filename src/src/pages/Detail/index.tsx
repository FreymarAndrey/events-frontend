import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Event } from "src/interfaces";
import { eventsData } from "src/data/events";
import profile from "src/assets/icons/avatar-profile.svg";
import camera from "src/assets/icons/camera.svg";
import upload from "src/assets/icons/upload.svg";
import styles from "./detail.module.css";
import { getFormatDay } from "src/utilities/pipes.utility";

export const DetailEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    if (initialized.current === false) {
      initialized.current = true;
      const eventData = eventsData.find(
        ({ id: idEvent }) => idEvent === parseInt(id || "0")
      );
      if (eventData) {
        setEvent(eventData);
      }
    }
  }, []);

  //   const openCamera = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //       const videoElement = document.createElement("video");
  //       videoElement.srcObject = stream;
  //       videoElement.play();
  //       document.body.appendChild(videoElement);
  //     } catch (error) {
  //       console.error("Error al acceder a la cámara:", error);
  //     }
  //   };

  return !event ? (
    <h1>no hay nada</h1>
  ) : (
    <>
      <article className={styles.article_detail}>
        <section className={styles.header}>
          <div className={styles.info}>
            <h3 className={styles.title}>Fotos {event.name}</h3>
            <p>
              {getFormatDay(event.date)}, Evento por project-x. Busca tu foto
            </p>
          </div>
          <div>
            <img src={profile} alt="icon" />
            <h3>
              Reconocimiento facial {id}
              <br />
              <span> tomate una selfie o sube una foto</span>
            </h3>
            <button className={styles.button_camera}>
              <img src={upload} alt="icon" className={styles.upload} />
              <img src={camera} alt="icon" />
            </button>
          </div>
          <button className={styles.not_ident}>Fotos no identificadas</button>
        </section>
        <section className={styles.container_images}>
          {event.images.map((image, index) => (
            <img key={index} src={image} alt={`${index}`} />
          ))}
        </section>
      </article>
    </>
  );
};
