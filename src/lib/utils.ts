import { LOCALE, WEATHER_CODE_MAP } from "@/constants";
import type { ClassValue } from "clsx";
import type { IconMeta } from "@/types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const hour12Formatter = new Intl.DateTimeFormat(LOCALE, {
  hour: "numeric",
  hour12: true,
});

const shortWeekdayFormatter = new Intl.DateTimeFormat(LOCALE, {
  weekday: "short",
});

const longWeekdayWithDateFormatter = new Intl.DateTimeFormat(LOCALE, {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatToHour12(date: Date): string {
  return hour12Formatter.format(date);
}

function formatToShortWeekday(date: Date): string {
  return shortWeekdayFormatter.format(date);
}

function formatToLongWeekdayWithDate(date: Date): string {
  return longWeekdayWithDateFormatter.format(date);
}

function getWeatherMeta(code: number): IconMeta {
  return WEATHER_CODE_MAP.get(code) ?? { src: "", alt: "" };
}

function round(value: number): number {
  return Math.round(value);
}

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

function getLocalIsoDate(date: Date): string {
  return date.toLocaleDateString("sv-SE");
}

const timeFormatter = new Intl.DateTimeFormat("sv-SE", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function getLocalIsoString(date: Date): string {
  const d = getLocalIsoDate(date);
  const t = timeFormatter.format(date);

  return `${d}T${t}`;
}

export {
  formatToHour12,
  formatToShortWeekday,
  formatToLongWeekdayWithDate,
  getWeatherMeta,
  round,
  cn,
  getLocalIsoDate, // Export this
  getLocalIsoString, // Export this
};
