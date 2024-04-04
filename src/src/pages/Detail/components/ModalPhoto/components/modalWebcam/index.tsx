import { useEffect, useRef, useState } from "react";
import styles from "./webcam.module.css";

type Props = {
  closeModal: () => void;
};

export const Webcam = ({ closeModal }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(true);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {};
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setTimeout(() => {
          videoRef.current?.play();
        }, 1000);
      }
    } catch (error) {}
  };

  const finishCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    closeModal();
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    const videoElement = videoRef.current;
    if (videoElement) {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext("2d")?.drawImage(videoElement, 0, 0);
      const imageDataURL = canvas.toDataURL("image/png");
      setCapturedPhoto(imageDataURL);
      setIsCameraOpen(false);
      const stream = videoRef.current?.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.classList.add("hidden");
    }
  };

  const closeAndReset = () => {
    setIsCameraOpen(true);
    setCapturedPhoto(null);
    finishCamera();
  };

  const handleReplaceButtonClick = () => {
    startCamera();
    if (videoRef.current) {
      videoRef.current.classList.remove("hidden");
    }
    setIsCameraOpen(true);
  };

  return (
    <>
      <section ref={modalRef} className={styles.section_webcam}>
        <div
          onClick={() => {
            setTimeout(() => {
              closeAndReset();
            }, 500);
            if (modalRef.current) {
              modalRef.current.classList.add("animate__fadeOut");
            }
          }}
          className={styles.overlay}
        ></div>
        <video ref={videoRef} className={styles.video}></video>
        <form action="">
          {!isCameraOpen && capturedPhoto && (
            <img
              src={capturedPhoto}
              alt="Captured"
              className={styles.capturedImage}
            />
          )}
          <div className={styles.container_button}>
            {isCameraOpen && (
              <button
                type="button"
                onClick={capturePhoto}
                className={styles.button_capture}
              >
                Capturar
              </button>
            )}
            {!isCameraOpen && (
              <>
                <button
                  type="button"
                  onClick={handleReplaceButtonClick}
                  className={styles.button_capture}
                >
                  Reemplazar
                </button>
                <button
                  type="button"
                  onClick={closeAndReset}
                  className={styles.button_close}
                >
                  Buscar
                </button>
              </>
            )}
          </div>
        </form>
      </section>
    </>
  );
};
