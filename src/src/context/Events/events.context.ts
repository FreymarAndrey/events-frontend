import { createContext } from "react";
import { Event } from "src/interfaces/events";

export interface EventsContextType {
  events: Event[];
  updateEvents: (newEvents: Event[]) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export default EventsContext;
