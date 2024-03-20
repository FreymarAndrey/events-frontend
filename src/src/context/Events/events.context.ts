import { createContext } from "react";
import { Event } from "src/interfaces/events";

export interface EventsContext {
  events: Event[];
  updateEvents: (newEvents: Event[]) => void;
}

export const EventsContext = createContext<EventsContext | undefined>(
  undefined
);
