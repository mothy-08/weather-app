import {
  formatDateWithWeekday,
  formatShortWeekdayOnly,
  formatToHour12,
  getIsoDate,
  getIsoDateOnly,
  getWeatherMeta,
  roundValue,
} from "./lib/utils";
import type {
  CurrentWeather,
  DailyForecast,
  DailyWeather,
  HourlyForecast,
  HourlyWeather,
  Nowcast,
} from "./types";

const DAYS_LENGTH = 7;

export function adaptDailyForecasts(daily: DailyWeather): DailyForecast[] {
  if (!daily) return [];

  const { dates, tempsMax, tempsMin, weatherCodes } = daily;

  if (
    tempsMax == null ||
    tempsMin == null ||
    weatherCodes == null ||
    !dates.length ||
    !tempsMax.length ||
    !tempsMin.length ||
    !weatherCodes.length
  )
    return [];

  const count = Math.min(
    DAYS_LENGTH,
    dates.length,
    tempsMax.length,
    tempsMin.length,
    weatherCodes.length,
  );

  const out: DailyForecast[] = [];
  for (let i = 0; i < count; i++) {
    const [date, tempMax, tempMin, code] = [
      dates[i],
      tempsMax[i],
      tempsMin[i],
      weatherCodes[i],
    ];

    // undefined because temp and code might have 0 values
    if (
      date == undefined ||
      tempMax == undefined ||
      tempMin == undefined ||
      code == undefined
    )
      continue;

    const { src, alt } = getWeatherMeta(code);

    out.push({
      isoDateOnly: getIsoDateOnly(date),
      shortWeekdayOnly: formatShortWeekdayOnly(date),
      weatherConditionIconPath: src,
      weatherIconDescription: alt,
      tempHigh: roundValue(tempMax),
      tempLow: roundValue(tempMin),
    });
  }

  return out;
}

export function adaptHourlyForecast(hourly: HourlyWeather): HourlyForecast[] {
  if (!hourly) return [];

  const { dates, temps, weatherCodes } = hourly;

  if (
    temps == null ||
    weatherCodes == null ||
    !dates.length ||
    !temps.length ||
    !weatherCodes.length
  )
    return [];

  const out: HourlyForecast[] = [];

  // FIX: change 12 later for hourly logic anchored by day
  for (let i = 0; i < 12; i++) {
    const [date, temp, code] = [dates[i], temps[i], weatherCodes[i]];

    if (date == undefined || temp == undefined || code == undefined) continue;

    const { src, alt } = getWeatherMeta(code);

    out.push({
      weatherConditionIconPath: src,
      weatherIconDescription: alt,
      isoDate: getIsoDate(date),
      hour12: formatToHour12(date),
      temp: roundValue(temp),
    });
  }

  return out;
}

export function adaptCurrentWeather(params: {
  current: CurrentWeather;
  city: string;
  country: string;
}): Nowcast {
  const { current, city, country } = params;
  const { temp, weatherCode, date } = current;

  const { src, alt } = getWeatherMeta(weatherCode);
  return {
    city,
    country,
    formattedDateWithWeekday: formatDateWithWeekday(date),
    isoDate: getIsoDate(date),
    weatherConditionIconPath: src,
    weatherIconDescription: alt,
    currentTemp: roundValue(temp),
  };
}

export function adaptWeatherHiglights(current: CurrentWeather) {
  const { apparentTemp, humidity, windSpeed, precipitation } = current;

  return {
    feelsLike: roundValue(apparentTemp),
    humidity: roundValue(humidity),
    windSpeed: roundValue(windSpeed),
    precipitation: roundValue(precipitation),
  };
}
