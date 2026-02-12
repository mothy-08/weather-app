import { fetchWeatherApi } from "openmeteo";
import { ref, toValue, watchEffect } from "vue";

const API_URL = "https://api.open-meteo.com/v1/forecast";

export type CurrentWeather = {
  time: Date;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  wind_speed_10m: number;
  weather_code: number;
};

export type HourlyWeather = {
  time: Date[];
  temperature_2m: Float32Array<ArrayBufferLike> | null;
  weather_code: Float32Array<ArrayBufferLike> | null;
};

export type DailyWeather = {
  time: Date[];
  temperature_2m_max: Float32Array<ArrayBufferLike> | null;
  temperature_2m_min: Float32Array<ArrayBufferLike> | null;
  weather_code: Float32Array<ArrayBufferLike> | null;
};

export type WeatherData = {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
};

export function useWeather(coordinates: { latitude: number; longitude: number }) {
  const data = ref<WeatherData | null>(null);
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

      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          relative_humidity_2m: current.variables(1)!.value(),
          apparent_temperature: current.variables(2)!.value(),
          precipitation: current.variables(3)!.value(),
          wind_speed_10m: current.variables(4)!.value(),
          weather_code: current.variables(5)!.value(),
        },
        hourly: {
          time: Array.from(
            { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
            (_, i) =>
              new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000),
          ),
          temperature_2m: hourly.variables(0)!.valuesArray(),
          weather_code: hourly.variables(1)!.valuesArray(),
        },
        daily: {
          time: Array.from(
            { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
            (_, i) =>
              new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000),
          ),
          temperature_2m_max: daily.variables(0)!.valuesArray(),
          temperature_2m_min: daily.variables(1)!.valuesArray(),
          weather_code: daily.variables(2)!.valuesArray(),
        },
      };

      console.log(`No. of daily time entries: ${weatherData.daily.time.length}`);

      data.value = weatherData;
    } catch (e) {
      error.value = e;
    }
  });

  return { data, error };
}
