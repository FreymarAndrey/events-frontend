import { useReducer } from "react";
import { EventsContext } from "src/context/Events/index";
import { Event } from "src/interfaces/events";
import eventsReducer from "./events.reducer";

interface EventsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
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
