import { routing } from "@i18n/routing";

export type FlagCode = "RU" | "US" | "KG";

export type LanguageOption = {
  id: (typeof routing.locales)[number];
  title: string;
  flagCode: FlagCode;
};

export const LANGUAGES: LanguageOption[] = [
  { id: "ru", title: "RU", flagCode: "RU" },
  { id: "en", title: "EN", flagCode: "US" },
  { id: "ky", title: "KG", flagCode: "KG" },
];

export const CURRENCIES = [
  { id: 1, title: "KGS", flagCode: "KG" as const },
  { id: 2, title: "USD", flagCode: "US" as const }
];
