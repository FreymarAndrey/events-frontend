// events.provider.tsx
import React, { useReducer } from "react";
import EventsContext from "./events.context";
import { Event } from "src/interfaces/events";
import eventsReducer from "./events.reducer";

interface EventsProviderProps {
  children: JSX.Element | JSX.Element[];
}

const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, dispatch] = useReducer(eventsReducer, []);

  const updateEvents = (newEvents: Event[]) => {
    dispatch({ type: "SET_EVENTS", payload: newEvents });
  };

  const contextValue = { events, updateEvents };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
