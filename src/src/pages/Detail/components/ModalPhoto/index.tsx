import { useEffect, useRef, useState } from "react";
import styles from "./modalphoto.module.css";

type Props = {
  closeModal: () => void;
};

export const ModalPhoto = ({ closeModal }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        videoRef.current.classList.add(styles.webcam_video);
        setIsCameraOpen(true);
      }
    } catch (error) {}
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    const videoElement = document.querySelector("video") as HTMLVideoElement;
    if (videoElement) {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext("2d")?.drawImage(videoElement, 0, 0);
      const imageDataURL = canvas.toDataURL("image/png");
      setCapturedPhoto(imageDataURL);
    }
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
        <section>
          <h4>Toma una imagen o carga una imagen desde tu equipo </h4>
          <form>
            <div>
              <button
                type="button"
                onClick={openCamera}
                className={styles.webcam}
              >
                Webcam
              </button>
              <input
                name="input"
                id="input"
                type="file"
                className={styles.webcam}
              />
              <label htmlFor="input"> Subir imagen</label>
            </div>

            <video ref={videoRef}></video>
          </form>
          {capturedPhoto && (
            <img
              src={capturedPhoto}
              alt="Captured"
              className={styles.capturedImage}
            />
          )}
          {isCameraOpen && (
            <button
              type="button"
              onClick={capturePhoto}
              className={styles.captureButton}
            >
              Capturar Foto
            </button>
          )}
        </section>
      </article>
    </>
  );
};
