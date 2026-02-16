import type { IconMeta } from "./types";

const API_URL = "https://api.open-meteo.com/v1/forecast";
const ICONS_PATH = "/images/";

const WEATHER_ICONS = {
  SUNNY: `${ICONS_PATH}icon-sunny.webp`,
  PARTLY_CLOUDY: `${ICONS_PATH}icon-partly-cloudy.webp`,
  OVERCAST: `${ICONS_PATH}icon-overcast.webp`,
  FOG: `${ICONS_PATH}icon-fog.webp`,
  DRIZZLE: `${ICONS_PATH}icon-drizzle.webp`,
  RAIN: `${ICONS_PATH}icon-rain.webp`,
  SNOW: `${ICONS_PATH}icon-snow.webp`,
  STORM: `${ICONS_PATH}icon-storm.webp`,
} as const;

const WEATHER_GROUPS = [
  {
    codes: [0, 1],
    src: WEATHER_ICONS.SUNNY,
    alt: "Sunny weather",
  },
  {
    codes: [2],
    src: WEATHER_ICONS.PARTLY_CLOUDY,
    alt: "Partly cloudy weather",
  },
  {
    codes: [3],
    src: WEATHER_ICONS.OVERCAST,
    alt: "Overcast sky",
  },
  {
    codes: [45, 48],
    src: WEATHER_ICONS.FOG,
    alt: "Foggy conditions",
  },
  {
    codes: [51, 53, 55, 56, 57],
    src: WEATHER_ICONS.DRIZZLE,
    alt: "Light drizzle",
  },
  {
    codes: [61, 63, 65, 66, 67, 80, 81, 82],
    src: WEATHER_ICONS.RAIN,
    alt: "Rainy weather",
  },
  {
    codes: [71, 73, 75, 77, 85, 86],
    src: WEATHER_ICONS.SNOW,
    alt: "Snowy weather",
  },
  {
    codes: [95, 96, 99],
    src: WEATHER_ICONS.STORM,
    alt: "Thunderstorm conditions",
  },
] as const;

const WEATHER_CODE_MAP: ReadonlyMap<number, IconMeta> = new Map(
  WEATHER_GROUPS.flatMap(({ codes, src, alt }) =>
    codes.map((code) => [code, { src, alt }] as const),
  ),
);

export { API_URL, WEATHER_CODE_MAP };
