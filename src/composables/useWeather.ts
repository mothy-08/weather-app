import { fetchWeatherApi } from "openmeteo";
import { ref, shallowRef, watchEffect, toValue, type Ref } from "vue";
import type { AdaptedWeatherData, WeatherData } from "@/lib/types";
import { API_URL } from "@/lib/constants";
import {
  adaptCurrentWeather,
  adaptDailyForecasts,
  adaptHourlyForecast,
  adaptWeatherHiglights,
} from "@/adapter";

interface WeatherVariableProvider {
  variables(index: number): {
    value(): number;
    valuesArray(): Float32Array | null;
  } | null;
}

function generateTimeRange(
  start: number,
  end: number,
  interval: number,
): Date[] {
  const length = (end - start) / interval;
  return Array.from(
    { length },
    (_, i) => new Date((start + i * interval) * 1000),
  );
}

function getVal(provider: WeatherVariableProvider, index: number): number {
  return provider.variables(index)?.value() ?? 0;
}

function getArr(
  provider: WeatherVariableProvider,
  index: number,
): Float32Array | null {
  return provider.variables(index)?.valuesArray() ?? null;
}

const PARAMS_CONFIG = {
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
};

export function useWeather(
  params: Ref<{
    coordinates: { latitude: number; longitude: number };
    location: { city: string; country: string };
  }>,
) {
  const data = shallowRef<AdaptedWeatherData | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  async function fetchWeather() {
    const { coordinates, location } = toValue(params);
    const { latitude, longitude } = coordinates;

    isLoading.value = true;
    error.value = null;

    try {
      const responses = await fetchWeatherApi(API_URL, {
        latitude,
        longitude,
        timezone: "auto",
        ...PARAMS_CONFIG,
      });

      const response = responses[0];
      if (!response) throw new Error("Weather API returned empty response");

      const current = response.current()!;
      const hourly = response.hourly()!;
      const daily = response.daily()!;

      const weatherData: WeatherData = {
        current: {
          date: new Date(Number(current.time()) * 1000),
          temp: getVal(current, 0),
          humidity: getVal(current, 1),
          feelsLike: getVal(current, 2),
          precipitation: getVal(current, 3),
          windSpeed: getVal(current, 4),
          weatherCode: getVal(current, 5),
        },
        hourly: {
          dates: generateTimeRange(
            Number(hourly.time()),
            Number(hourly.timeEnd()),
            hourly.interval(),
          ),
          temps: getArr(hourly, 0),
          weatherCodes: getArr(hourly, 1),
        },
        daily: {
          dates: generateTimeRange(
            Number(daily.time()),
            Number(daily.timeEnd()),
            daily.interval(),
          ),
          tempsMax: getArr(daily, 0),
          tempsMin: getArr(daily, 1),
          weatherCodes: getArr(daily, 2),
        },
      };

      data.value = {
        overview: adaptCurrentWeather({
          current: weatherData.current,
          city: location.city,
          country: location.country,
        }),
        highlight: adaptWeatherHiglights(weatherData.current),
        daily: adaptDailyForecasts(weatherData.daily),
        hourly: adaptHourlyForecast(weatherData.hourly),
      };
    } catch (err) {
      console.error("Weather Fetch Error:", err);
      error.value =
        err instanceof Error ? err.message : "Failed to load weather data";
      data.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  watchEffect(() => {
    fetchWeather();
  });

  return {
    data,
    error,
    isLoading,
    refetch: fetchWeather,
  };
}
