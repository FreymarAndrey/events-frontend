import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Event } from "src/interfaces";
import { Search } from "src/components/UI/Search";
import eventsData from "src/data/index.json";
import loading from "src/assets/icons/loading.svg";
import search from "src/assets/icons/search.svg";
import styles from "./home.module.css";

const CardEvents = 12;

export const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const events: Event[] = eventsData;

  useEffect(() => {
    const loadedEvents = events.slice(0, currentPage * CardEvents);
    setAllEvents(events);
    setVisibleEvents(loadedEvents);
  }, [currentPage, events]);

  const loadMoreImages = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }, 2000);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setIsLoading(true);
    if (text.trim() === "") {
      setVisibleEvents(allEvents.slice(0, CardEvents));
      setIsLoading(false);
    } else {
      const filteredEvents = allEvents.filter((event) =>
        event.name.toLowerCase().includes(text.toLowerCase())
      );
      setVisibleEvents(filteredEvents);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <article className={styles.article_home}>
        <section className={styles.header}>
          <h3>Ultimos eventos</h3>
          <p>Selecciona el evento y busca tus fotos</p>
        </section>
        <section className={styles.time}>
          <div>
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="submenu"
                  id={styles.submenu}
                  placeholder="periodo"
                />
                <label htmlFor={styles.submenu}>
                  <div>Periodo</div>
                  <form>
                    Fecha de inicio
                    <input type="date" />
                    <input type="date" />
                    <button type="button">
                      Filtro <img src={search} alt="" />
                    </button>
                  </form>
                </label>
              </li>
            </ul>
          </div>
        </section>
        <section className={styles.content_card}>
          {visibleEvents.length === 0 &&
            !isLoading &&
            searchText.trim() !== "" && (
              <p>No se encontraron eventos con la búsqueda "{searchText}".</p>
            )}
          {visibleEvents.map((event, index) => (
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
        {!isLoading && events.length > visibleEvents.length && (
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
