import { useEffect, useRef } from "react";
import arrow from "src/assets/icons/arrow1.svg";
import styles from "./scrolltop.module.css";

export const ScrollTop = () => {
  const algo = useRef<HTMLButtonElement>(null);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollLimit = 100;
      if (window.scrollY >= scrollLimit) {
        algo.current?.classList.remove("animate__fadeOut");
        algo.current?.classList.add("animate__fadeIn");
      } else {
        algo.current?.classList.remove("animate__fadeIn");
        algo.current?.classList.add("animate__fadeOut");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.content_arrow}>
      <button
        ref={algo}
        onClick={handleScrollToTop}
        className="animate__animated animate__fadeOut"
      >
        <img src={arrow} alt="icon" />
      </button>
    </div>
  );
};
