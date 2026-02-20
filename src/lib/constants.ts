import type { IconMeta } from "@/lib/types";
import iconSunny from "@/assets/icons/icon-sunny.webp";
import iconPartlyCloudy from "@/assets/icons/icon-partly-cloudy.webp";
import iconOvercast from "@/assets/icons/icon-overcast.webp";
import iconFog from "@/assets/icons/icon-fog.webp";
import iconDrizzle from "@/assets/icons/icon-drizzle.webp";
import iconRain from "@/assets/icons/icon-rain.webp";
import iconSnow from "@/assets/icons/icon-snow.webp";
import iconStorm from "@/assets/icons/icon-storm.webp";

const API_URL = "https://api.open-meteo.com/v1/forecast";
const LOCALE = "en-US";

const WEATHER_GROUPS = [
  {
    codes: [0, 1],
    src: iconSunny,
    alt: "Sunny weather",
  },
  {
    codes: [2],
    src: iconPartlyCloudy,
    alt: "Partly cloudy weather",
  },
  {
    codes: [3],
    src: iconOvercast,
    alt: "Overcast sky",
  },
  {
    codes: [45, 48],
    src: iconFog,
    alt: "Foggy conditions",
  },
  {
    codes: [51, 53, 55, 56, 57],
    src: iconDrizzle,
    alt: "Light drizzle",
  },
  {
    codes: [61, 63, 65, 66, 67, 80, 81, 82],
    src: iconRain,
    alt: "Rainy weather",
  },
  {
    codes: [71, 73, 75, 77, 85, 86],
    src: iconSnow,
    alt: "Snowy weather",
  },
  {
    codes: [95, 96, 99],
    src: iconStorm,
    alt: "Thunderstorm conditions",
  },
] as const;

const WEATHER_CODE_MAP: ReadonlyMap<number, IconMeta> = new Map(
  WEATHER_GROUPS.flatMap(({ codes, src, alt }) =>
    codes.map((code) => [code, { src, alt }] as const),
  ),
);

export { API_URL, LOCALE, WEATHER_CODE_MAP };
