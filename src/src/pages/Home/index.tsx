import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Event } from "src/interfaces";
import { Search } from "src/components/UI/Search";
import eventsData from "src/data/events/index.json";
import loading from "src/assets/icons/loading.svg";
import search from "src/assets/icons/search.svg";
import styles from "./home.module.css";
import { LanguageContext } from "src/context/settings";
import { getFormatDay } from "src/utilities/pipes.utility";
import { useFormik } from "formik";
import { FilterValidatorForm } from "src/validator/filter.validator";

const CardEvents = 12;

export const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const languageContext = useContext(LanguageContext);
  const { LanguageState } = languageContext;
  const { translated_text } = LanguageState;

  const events: Event[] = eventsData;

  useEffect(() => {
    const loadedEvents = events.slice(0, currentPage * CardEvents);
    setAllEvents(events);
    setVisibleEvents(loadedEvents);
  }, [currentPage, events]);

  const formik = useFormik({
    initialValues: FilterValidatorForm.initialState,
    onSubmit: (values) => {
      setIsLoading(true);
      if (values.start_date && values.end_date) {
        const filteredEvents = allEvents.filter((event) => {
          const eventDate = new Date(event.date);
          const startDate = new Date(values.start_date);
          const endDate = new Date(values.end_date);
          return eventDate >= startDate && eventDate <= endDate;
        });
        setVisibleEvents(filteredEvents);
        setIsLoading(false);
      } else {
        setVisibleEvents(allEvents.slice(0, CardEvents));
        setIsLoading(false);
      }
    },
  });

  const loadMoreImages = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }, 500);
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
          <h3>{translated_text.latest_events}</h3>
          <p>{translated_text.select_the_event_and_search_for_your_photos}</p>
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
                  <div>{translated_text.period}</div>
                  <form onSubmit={formik.handleSubmit}>
                    Fecha de inicio
                    <input
                      type="date"
                      name="start_date"
                      value={formik.values.start_date}
                      onChange={formik.handleChange}
                    />
                    <input
                      type="date"
                      name="end_date"
                      value={formik.values.end_date}
                      onChange={formik.handleChange}
                    />
                    <button type="submit">
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
              <Link to={"/event/" + event.id}>
                <div className={styles.img}>
                  <img src={event.image} alt="img" />
                </div>
                <div className={styles.description}>
                  <div className={styles.info}>
                    <h4>{event.name}</h4>
                    <p>{getFormatDay(event.date)}</p>
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
        {!isLoading &&
          events.length > visibleEvents.length &&
          visibleEvents.length >= CardEvents && (
            <section className={styles.load}>
              <div>
                <button onClick={loadMoreImages}>
                  {translated_text.load_more}
                </button>
              </div>
            </section>
          )}
      </article>
    </>
  );
};
