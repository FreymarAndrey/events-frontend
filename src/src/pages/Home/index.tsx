import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Event } from "src/interfaces";
import { Search } from "src/components/UI/Search";
import eventsData from "src/data/index.json";
import loading from "src/assets/icons/loading.svg";
import styles from "./home.module.css";

const IMAGES_PER_PAGE = 12;
const LOADING_DELAY_MS = 500;

export const Home: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const events: Event[] = eventsData;

  const loadMoreImages = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
    }, LOADING_DELAY_MS);
  };

  useEffect(() => {
    const loadEvents = events.slice(0, currentPage * IMAGES_PER_PAGE);
    setVisibleEvents(loadEvents);
  }, []);

  useEffect(() => {
    const loadEvents = events.slice(0, currentPage * IMAGES_PER_PAGE);
    setVisibleEvents(loadEvents);
    setIsLoading(false);
  }, [currentPage]);

  const filteredEvents = visibleEvents.filter((event) =>
    event.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <article className={styles.article_home}>
        <Search setSearchText={setSearchText} />

        <section className={styles.header}>
          <h3>Ultimos eventos</h3>
          <p>Selecciona el evento y busca tus fotos</p>
        </section>
        <section className={styles.time}>
          <div>
            <input type="text" placeholder="periodo" />
          </div>
        </section>
        <section className={styles.content_card}>
          {filteredEvents.map((event, index) => (
            <div className={styles.card} key={index}>
              <Link to={"#"}>
                <div className={styles.img}>
                  <img src={event.image} alt="img" />
                </div>
                <div className={styles.description}>
                  <div className={styles.info}>
                    <h4>{event.name}</h4>
                    <p>{event.date}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>

        {isLoading && (
          <section className={styles.reload}>
            <img src={loading} alt="icon" />
          </section>
        )}
        {!isLoading && events.length > filteredEvents.length && (
          <section className={styles.load}>
            <div>
              <button onClick={loadMoreImages}>Cargar más...</button>
            </div>
          </section>
        )}
      </article>
    </>
  );
};
