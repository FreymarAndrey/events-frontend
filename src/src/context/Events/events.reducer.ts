import { Event } from "src/interfaces/events";

type Action = { type: "SET_EVENTS"; payload: Event[] };

const eventsReducer = (state: Event[], action: Action): Event[] => {
  switch (action.type) {
    case "SET_EVENTS":
      return action.payload;
    default:
      return state;
  }
};

export default eventsReducer;
