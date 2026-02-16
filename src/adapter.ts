import {
  formatToLongWeekdayWithDate,
  formatToShortWeekday,
  formatToHour12,
  getWeatherMeta,
  round,
  getLocalIsoString,
  getLocalIsoDate,
} from "./lib/utils";
import type {
  CurrentWeather,
  DailyForecast,
  DailyWeather,
  HourlyForecast,
  HourlyWeather,
  Nowcast,
} from "./lib/types";

export function adaptDailyForecasts(daily: DailyWeather): DailyForecast[] {
  const { dates, tempsMax, tempsMin, weatherCodes } = daily;

  if (
    !dates.length ||
    !tempsMax?.length ||
    !tempsMin?.length ||
    !weatherCodes?.length
  ) {
    return [];
  }

  if (
    dates.length !== tempsMax.length ||
    dates.length !== tempsMin.length ||
    dates.length !== weatherCodes.length
  ) {
    throw new Error("Daily Weather arrays must have equal lengths");
  }

  const out: DailyForecast[] = [];

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const tempMax = tempsMax[i];
    const tempMin = tempsMin[i];
    const code = weatherCodes[i];

    if (
      date == undefined ||
      tempMax == undefined ||
      tempMin == undefined ||
      code == undefined
    ) {
      continue;
    }

    out.push({
      date: getLocalIsoDate(date),
      weekdayShort: formatToShortWeekday(date),
      icon: getWeatherMeta(code),
      tempHigh: round(tempMax),
      tempLow: round(tempMin),
    });
  }

  return out;
}

export function adaptHourlyForecast(hourly: HourlyWeather): HourlyForecast[] {
  const { dates, temps, weatherCodes } = hourly;

  if (!dates.length || !temps?.length || !weatherCodes?.length) {
    return [];
  }

  if (dates.length !== temps.length || dates.length !== weatherCodes.length) {
    throw new Error("Hourly Weather arrays must have equal lengths");
  }

  const out: HourlyForecast[] = [];

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const temp = temps[i];
    const code = weatherCodes[i];

    if (date == undefined || temp == undefined || code == undefined) {
      continue;
    }

    out.push({
      date: getLocalIsoString(date),
      hour12: formatToHour12(date),
      temp: round(temp),
      icon: getWeatherMeta(code),
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

  return {
    city,
    country,
    weekdayWithDate: formatToLongWeekdayWithDate(date),
    date: getLocalIsoString(date),
    icon: getWeatherMeta(weatherCode),
    temp: round(temp),
  };
}

export function adaptWeatherHiglights(current: CurrentWeather) {
  const {
    feelsLike: apparentTemp,
    humidity,
    windSpeed,
    precipitation,
  } = current;

  return {
    feelsLike: round(apparentTemp),
    humidity: round(humidity),
    windSpeed: round(windSpeed),
    precipitation: round(precipitation),
  };
}
