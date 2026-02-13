import {
  DATE_WITH_WEEKDAY_FORMATTER,
  WEATHER_CODE_MAP,
  SHORT_WEEKDAY_ONLY_FORMATTER,
  type WeatherMeta,
} from "@/constants";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getWeatherMeta(code: number): WeatherMeta {
  return WEATHER_CODE_MAP.get(code) ?? { src: "", alt: "" };
}

function roundValue(value: number): number {
  return Math.round(value);
}

function formatDateWithWeekday(date: Date): string {
  return DATE_WITH_WEEKDAY_FORMATTER.format(date);
}

function formatShortWeekdayOnly(date: Date): string {
  return SHORT_WEEKDAY_ONLY_FORMATTER.format(date);
}

function getIsoDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getIsoDate(date: Date): string {
  return date.toISOString();
}

function formatToHour12(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
}

export {
  cn,
  getWeatherMeta,
  roundValue,
  formatDateWithWeekday,
  formatShortWeekdayOnly,
  getIsoDateOnly,
  getIsoDate,
  formatToHour12,
};
