import React, { useEffect, useRef, useState } from "react";
import cut from "src/assets/icons/cut.svg";
import { Webcam } from "./components/modalWebcam";
import styles from "./modalphoto.module.css";

type Props = {
  closeModal: () => void;
};

export const ModalPhoto = ({ closeModal }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadModalRef = useRef<HTMLDivElement>(null);
  const closeUploadModalRef = useRef<HTMLDivElement>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const showModal = () => {
    if (uploadModalRef.current) {
      uploadModalRef.current.classList.add(styles.hidden);
    }
    setModalVisible(true);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setSelectedImage(imageUrl);
      };
      reader.readAsDataURL(file);
      if (closeUploadModalRef.current) {
        closeUploadModalRef.current.classList.add(styles.hidden);
      }
    }
  };

  const handleReplaceButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEditButtonClick = () => {};

  const handleCloseModalPhoto = () => {
    setModalVisible(false);
    closeModal();
  };

  return (
    <>
      <article
        ref={modalRef}
        className={`animate__animated animate__fadeIn animate__faster ${styles.article_modal}`}
      >
        <div
          onClick={() => {
            if (modalRef.current) {
              modalRef.current.classList.add("animate__fadeOut");
            }
            setTimeout(() => {
              closeModal();
            }, 500);
          }}
          className={styles.overlay}
        ></div>
        <section className={styles.section_photo} ref={uploadModalRef}>
          <div ref={closeUploadModalRef} className={styles.content_description}>
            <h4>Toma una imagen o carga una imagen desde tu equipo </h4>
            <form>
              <div>
                <button
                  type="button"
                  onClick={showModal}
                  className={styles.webcam}
                >
                  Webcam
                </button>
                <input
                  ref={fileInputRef}
                  name="input"
                  id="input"
                  type="file"
                  className={styles.webcam}
                  onChange={handleFileInputChange}
                  accept="image/*"
                />
                <label htmlFor="input"> Subir imagen</label>
              </div>
            </form>
          </div>

          {selectedImage && (
            <div className={styles.content_img}>
              <img
                src={selectedImage}
                alt="Preview"
                className={styles.preview_img}
              />
              <div className={styles.content_button}>
                <button
                  className={styles.button_replace}
                  onClick={handleReplaceButtonClick}
                >
                  Reemplazar
                </button>
                <button
                  onClick={() => {
                    if (modalRef.current) {
                      modalRef.current.classList.add("animate__fadeOut");
                    }
                    setTimeout(() => {
                      closeModal();
                    }, 500);
                  }}
                  className={styles.button_search}
                >
                  Buscar
                </button>
                <button
                  onClick={handleEditButtonClick}
                  className={styles.button_cut}
                >
                  <img src={cut} alt="cut-icon" className={styles.cut_button} />
                </button>
              </div>
            </div>
          )}
        </section>
        {modalVisible && <Webcam closeModal={handleCloseModalPhoto} />}
      </article>
    </>
  );
};
