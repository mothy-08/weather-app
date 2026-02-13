import { fetchWeatherApi } from "openmeteo";
import { ref, toValue, watchEffect } from "vue";
import type { AdaptedWeatherData, WeatherData } from "./types";
import { API_URL } from "./constants";
import {
  adaptCurrentWeather,
  adaptDailyForecasts,
  adaptHourlyForecast,
  adaptWeatherHiglights,
} from "./adapter";

export function useWeather(params: {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  location: { city: string; country: string };
}) {
  const { coordinates, location } = params;
  const data = ref<AdaptedWeatherData | null>(null);
  const error = ref<unknown | null>(null);

  watchEffect(async () => {
    data.value = null;
    error.value = null;

    const { latitude, longitude } = toValue(coordinates);

    const weatherParams = {
      latitude,
      longitude,
      daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
      hourly: ["temperature_2m", "weather_code"],
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "precipitation",
        "wind_speed_10m",
        "weather_code",
      ],
      timezone: "auto",
    };

    try {
      const responses = await fetchWeatherApi(API_URL, weatherParams);
      const response = responses[0];

      if (!response) {
        throw new Error("Response is undefined!");
      }

      const utcOffsetSeconds = response.utcOffsetSeconds();

      const current = response.current()!;
      const hourly = response.hourly()!;
      const daily = response.daily()!;

      const weatherData: WeatherData = {
        current: {
          date: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temp: current.variables(0)!.value(),
          humidity: current.variables(1)!.value(),
          apparentTemp: current.variables(2)!.value(),
          precipitation: current.variables(3)!.value(),
          windSpeed: current.variables(4)!.value(),

          weatherCode: current.variables(5)!.value(),
        },
        hourly: {
          dates: Array.from(
            {
              length:
                (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval(),
            },
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  utcOffsetSeconds) *
                  1000,
              ),
          ),
          temps: hourly.variables(0)!.valuesArray(),
          weatherCodes: hourly.variables(1)!.valuesArray(),
        },
        daily: {
          dates: Array.from(
            {
              length:
                (Number(daily.timeEnd()) - Number(daily.time())) /
                daily.interval(),
            },
            (_, i) =>
              new Date(
                (Number(daily.time()) +
                  i * daily.interval() +
                  utcOffsetSeconds) *
                  1000,
              ),
          ),
          tempsMax: daily.variables(0)!.valuesArray(),
          tempsMin: daily.variables(1)!.valuesArray(),
          weatherCodes: daily.variables(2)!.valuesArray(),
        },
      };

      const { city, country } = toValue(location);

      // TODO: city & country => must be inferred from coordinates
      const adaptedWeatherData = {
        overview: adaptCurrentWeather({
          current: weatherData.current,
          city,
          country,
        }),
        highlight: adaptWeatherHiglights(weatherData.current),
        daily: adaptDailyForecasts(weatherData.daily),
        hourly: adaptHourlyForecast(weatherData.hourly),
      } as const;

      data.value = adaptedWeatherData;
    } catch (e) {
      error.value = e;
    }
  });

  return { data, error };
}
