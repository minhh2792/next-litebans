import { siteConfig } from "@config/site";
import { formatDistance } from "date-fns";
import * as locales from "date-fns/locale";

type Locales = typeof locales;

const formatDate = (date: Date, locale: string = siteConfig.languages.default) => {
  return new Intl.DateTimeFormat(locale, {
    timeZone: siteConfig.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
}

const formatDuration = (start: Date, end: Date, lang: string) => {
  return formatDistance(start, end, { 
    locale: locales[lang as keyof Locales]
  });
}

export { formatDate, formatDuration }