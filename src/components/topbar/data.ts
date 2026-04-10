import { routing } from "../../i18n/routing";

export type LanguageOption = {
  id: (typeof routing.locales)[number];
  title: string;
  imgUrl: string;
};

export const LANGUAGES: LanguageOption[] = [
  { id: "ru", title: "RU", imgUrl: "/assets/images/flags/ru.svg" },
  { id: "en", title: "EN", imgUrl: "/assets/images/flags/usa.png" },
];

export const CURRENCIES = [
  { id: 1, title: "USD", imgUrl: "/assets/images/flags/usa.png" },
  { id: 2, title: "EUR", imgUrl: "/assets/images/flags/uk.png" },
  { id: 3, title: "BDT", imgUrl: "/assets/images/flags/bd.png" },
  { id: 4, title: "INR", imgUrl: "/assets/images/flags/in.png" }
];
