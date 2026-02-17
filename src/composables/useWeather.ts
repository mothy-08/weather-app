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

// Helper to generate date ranges (DRY principle)
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

// Helper to safely extract scalar values (e.g., current temp)
function getVal(provider: WeatherVariableProvider, index: number): number {
  return provider.variables(index)?.value() ?? 0;
}

// Helper to safely extract array values (e.g., hourly temps)
function getArr(
  provider: WeatherVariableProvider,
  index: number,
): Float32Array | null {
  return provider.variables(index)?.valuesArray() ?? null;
}

// Define params configuration outside to ensure index matching stability
const PARAMS_CONFIG = {
  daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
  hourly: ["temperature_2m", "weather_code"],
  current: [
    "temperature_2m", // 0
    "relative_humidity_2m", // 1
    "apparent_temperature", // 2
    "precipitation", // 3
    "wind_speed_10m", // 4
    "weather_code", // 5
  ],
};

export function useWeather(
  // Accept a getter or a Ref for maximum flexibility
  params: Ref<{
    coordinates: { latitude: number; longitude: number };
    location: { city: string; country: string };
  }>,
) {
  // Use shallowRef for performance. We replace the whole object, we don't mutate deep props.
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

      // Use non-null assertions (!) only because we trust the SDK structure matches our PARAMS_CONFIG
      const current = response.current()!;
      const hourly = response.hourly()!;
      const daily = response.daily()!;

      // 1. Map Raw SDK Data to Domain Type
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

      // 2. Adapt to View Model
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
