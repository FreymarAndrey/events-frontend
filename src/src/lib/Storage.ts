export class CustomStorage {
  static get language() {
    return localStorage.getItem("language") || "es";
  }

  static set language(language: string) {
    localStorage.setItem("language", language);
  }
}
