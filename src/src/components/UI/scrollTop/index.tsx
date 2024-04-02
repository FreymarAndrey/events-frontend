import { useEffect, useRef, useState } from "react";
import arrow from "src/assets/icons/arrow1.svg";
import styles from "./scrolltop.module.css";

export const ScrollTop = () => {
  const move = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollLimit = 100;
      if (window.scrollY >= scrollLimit && !isVisible) {
        move.current?.classList.remove("animate__fadeOut");
        move.current?.classList.add("animate__fadeIn");
        setIsVisible(true);
      } else {
        move.current?.classList.remove("animate__fadeIn");
        move.current?.classList.add("animate__fadeOut");
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.content_arrow}>
      {isVisible && (
        <button
          ref={move}
          onClick={handleScrollToTop}
          className="animate__animated animate__fadeOut"
        >
          <img src={arrow} alt="icon" />
        </button>
      )}
    </div>
  );
};
