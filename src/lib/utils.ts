import { WEATHER_CODE_MAP } from "@/lib/constants";
import type { ClassValue } from "clsx";
import type { IconMeta } from "@/lib/types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const hour12Formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: true,
});

const shortWeekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
});

const longWeekdayWithDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("sv-SE", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function formatToHour12(date: Date): string {
  return hour12Formatter.format(date);
}

export function formatToShortWeekday(date: Date): string {
  return shortWeekdayFormatter.format(date);
}

export function formatToLongWeekdayWithDate(date: Date): string {
  return longWeekdayWithDateFormatter.format(date);
}

export function getWeatherMeta(code: number): IconMeta {
  return WEATHER_CODE_MAP.get(code) ?? { src: "", alt: "" };
}

export function round(value: number): number {
  return Math.round(value);
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getLocalIsoDate(date: Date): string {
  return date.toLocaleDateString("sv-SE");
}

export function getLocalIsoString(date: Date): string {
  const d = getLocalIsoDate(date);
  const t = timeFormatter.format(date);

  return `${d}T${t}`;
}
