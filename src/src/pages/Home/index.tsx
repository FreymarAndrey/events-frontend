import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Event } from "src/interfaces";
import { Search } from "src/components/UI/Search";
import loading from "src/assets/icons/loading.svg";
import search from "src/assets/icons/search.svg";
import styles from "./home.module.css";
import { LanguageContext } from "src/context/settings";
import { getFormatDay } from "src/utilities/pipes.utility";
import { useFormik } from "formik";
import { FilterValidatorForm } from "src/validator/filter.validator";
import { publicRoutes } from "src/models";
import { eventsData } from "src/data/events";
import { ScrollTop } from "src/components/UI/ScrollTop";

const CardEvents = 12;

export const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, setSearchText] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);

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
    validationSchema: FilterValidatorForm.validatorSchemaFilter,
    onSubmit: (values) => {
      formik.validateForm(values).then((errors) => {
        if (Object.keys(errors).length === 0) {
          if (values.start_date && values.end_date) {
            const startDate = new Date(values.start_date);
            const endDate = new Date(values.end_date);

            if (endDate < startDate) {
              setShowAlert(true);
            } else {
              setShowAlert(false);
              setIsLoading(true);
              const filteredEvents = allEvents.filter((event) => {
                const eventDate = new Date(event.date);
                return eventDate >= startDate && eventDate <= endDate;
              });
              setVisibleEvents(filteredEvents);
              setIsLoading(false);
              setSearched(true);
            }
          } else {
            setVisibleEvents(allEvents.slice(0, CardEvents));
          }
        } else {
          setShowAlert(false);
          alert("Las fechas son incorrectas");
        }
      });
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
      setSearched(false);
    } else {
      const filteredEvents = allEvents.filter((event) =>
        event.name.toLowerCase().includes(text.toLowerCase())
      );
      setVisibleEvents(filteredEvents);
      setIsLoading(false);
      setSearched(true);
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
                </label>

                <form onSubmit={formik.handleSubmit}>
                  Fecha de inicio
                  <input
                    type="date"
                    name="start_date"
                    value={formik.values.start_date}
                    onChange={formik.handleChange}
                  />
                  Fecha final
                  <input
                    type="date"
                    name="end_date"
                    value={formik.values.end_date}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.start_date && (
                    <p>{formik.errors.start_date}</p>
                  )}
                  {formik.errors.end_date && <p>{formik.errors.end_date}</p>}
                  {showAlert && (
                    <p className={styles.alert}>
                      La fecha final debe ser mayor que la fecha inicial
                    </p>
                  )}
                  <button type="submit">
                    Filtro <img src={search} alt="" />
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </section>
        <section className={styles.content_card}>
          {visibleEvents.length === 0 && searched && !isLoading && (
            <p>No se encontraron eventos con los criterios de búsqueda.</p>
          )}
          {visibleEvents.map((event, index) => (
            <div className={styles.card} key={index}>
              <Link to={`/${publicRoutes.HOME}/evento/${event.id}`}>
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
        <ScrollTop />
      </article>
    </>
  );
};
