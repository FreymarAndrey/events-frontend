import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Event } from "src/interfaces";
import { eventsData } from "src/data/events";
import profile from "src/assets/icons/avatar-profile.svg";
import camera from "src/assets/icons/camera.svg";
import upload from "src/assets/icons/upload.svg";
import styles from "./detail.module.css";
import { getFormatDay } from "src/utilities/pipes.utility";
import { ModalPhoto } from "./components/ModalPhoto";
import { LanguageContext } from "src/context/settings";

export const DetailEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const initialized = useRef<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const languageContext = useContext(LanguageContext);
  const { LanguageState } = languageContext;
  const { translated_text } = LanguageState;

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

  const showModal = () => {
    setModalVisible(true);
  };

  return !event ? (
    <h1>no hay nada</h1>
  ) : (
    <>
      <article className={styles.article_detail}>
        <section className={styles.header}>
          <div className={styles.info}>
            <h3 className={styles.title}>
              {translated_text.photos} {event.name}
            </h3>
            <p>
              {getFormatDay(event.date)},
              {translated_text.event_by_project_x_search_for_your_photo}
            </p>
          </div>
          <div>
            <img src={profile} alt="icon" />
            <h3>
              {translated_text.facial_recognition}
              <br />
              <span> {translated_text.take_a_selfie_or_upload_a_photo} </span>
            </h3>
            <button className={styles.button_camera} onClick={showModal}>
              <img src={upload} alt="icon" className={styles.upload} />
              <img src={camera} alt="icon" />
            </button>
          </div>
          <button className={styles.not_ident}>
            {translated_text.photos_not_identified}
          </button>
        </section>
        <section className={styles.container_images}>
          <figure>
            {event.images.map((image, index) => (
              <img key={index} src={image} alt={`${index}`} />
            ))}
          </figure>
        </section>

        {modalVisible && (
          <ModalPhoto closeModal={() => setModalVisible(false)} />
        )}
      </article>
    </>
  );
};
