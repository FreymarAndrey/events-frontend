import { CustomStorage } from "src/lib";

export const getFormatDay = (eventsData: string) => {
  const language = CustomStorage.language;
  const text = new Date(eventsData).toLocaleDateString(
    language === "es" ? "es" : "en",
    { weekday: "long", year: "numeric", month: "short", day: "numeric" }
  );
  return text;
};
