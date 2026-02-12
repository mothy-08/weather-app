<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import SearchBar from "./components/SearchBar.vue";
import CurrentWeatherCard from "./components/CurrentWeatherCard.vue";
import { useWeather } from "./useWeather";
import { computed } from "vue";
import { WEATHER_CODE_MAP, WEATHER_DESCRIPTION_MAP } from "./constants";
import WeatherHighlightCard from "./components/WeatherHighlightCard.vue";
import DailyForecastItem from "./components/DailyForecastItem.vue";
import HourlyForecastItem from "./components/HourlyForecastItem.vue";

const BATANGAS_COORDINATES = {
  latitude: 13.7567,
  longitude: 121.0584,
};

const { data, error } = useWeather(BATANGAS_COORDINATES);

const currentTempRounded = computed(() => {
  const currentTemp = data.value?.current.temperature_2m;

  if (currentTemp) {
    return Math.round(currentTemp);
  }

  return undefined;
});

const weatherConditionIconPath = computed((): string => {
  const code = data.value?.current.weather_code;

  if (code) {
    return WEATHER_CODE_MAP.get(code) ?? "";
  }

  return "";
});

const weatherDescription = computed((): string => {
  if (weatherConditionIconPath.value)
    return WEATHER_DESCRIPTION_MAP.get(weatherConditionIconPath.value) ?? "";
  return "";
});

const weatherHighlights = computed(() => {
  return [
    { type: "feelsLike", value: Math.round(data.value?.current.apparent_temperature ?? NaN) },
    { type: "humidity", value: Math.round(data.value?.current.relative_humidity_2m ?? NaN) },
    { type: "wind", value: Math.round(data.value?.current.wind_speed_10m ?? NaN) },
    { type: "precipitation", value: Math.round(data.value?.current.precipitation ?? NaN) },
  ] as const;
});

const dailyForecasts = computed(() => {
  return [
    {
      date: data.value?.daily.time[0],
      weatherConditionIconPath: data.value?.daily.weather_code
        ? WEATHER_CODE_MAP.get(data.value?.daily.weather_code[0] ?? NaN)
        : "",

      tempHigh: data.value?.daily.temperature_2m_max
        ? Math.round(data.value?.daily.temperature_2m_max[0] ?? NaN)
        : NaN,
      tempLow: data.value?.daily.temperature_2m_min
        ? Math.round(data.value?.daily.temperature_2m_min[0] ?? NaN)
        : NaN,
    },
    {
      date: data.value?.daily.time[1],
      weatherConditionIconPath: data.value?.daily.weather_code
        ? WEATHER_CODE_MAP.get(data.value?.daily.weather_code[1] ?? NaN)
        : "",

      tempHigh: data.value?.daily.temperature_2m_max
        ? Math.round(data.value?.daily.temperature_2m_max[1] ?? NaN)
        : NaN,
      tempLow: data.value?.daily.temperature_2m_min
        ? Math.round(data.value?.daily.temperature_2m_min[1] ?? NaN)
        : NaN,
    },
    {
      date: data.value?.daily.time[2],
      weatherConditionIconPath: data.value?.daily.weather_code
        ? WEATHER_CODE_MAP.get(data.value?.daily.weather_code[2] ?? NaN)
        : "",

      tempHigh: data.value?.daily.temperature_2m_max
        ? Math.round(data.value?.daily.temperature_2m_max[2] ?? NaN)
        : NaN,
      tempLow: data.value?.daily.temperature_2m_min
        ? Math.round(data.value?.daily.temperature_2m_min[2] ?? NaN)
        : NaN,
    },
    {
      date: data.value?.daily.time[3],
      weatherConditionIconPath: data.value?.daily.weather_code
        ? WEATHER_CODE_MAP.get(data.value?.daily.weather_code[3] ?? NaN)
        : "",

      tempHigh: data.value?.daily.temperature_2m_max
        ? Math.round(data.value?.daily.temperature_2m_max[3] ?? NaN)
        : NaN,
      tempLow: data.value?.daily.temperature_2m_min
        ? Math.round(data.value?.daily.temperature_2m_min[3] ?? NaN)
        : NaN,
    },
    {
      date: data.value?.daily.time[4],
      weatherConditionIconPath: data.value?.daily.weather_code
        ? WEATHER_CODE_MAP.get(data.value?.daily.weather_code[4] ?? NaN)
        : "",

      tempHigh: data.value?.daily.temperature_2m_max
        ? Math.round(data.value?.daily.temperature_2m_max[4] ?? NaN)
        : NaN,
      tempLow: data.value?.daily.temperature_2m_min
        ? Math.round(data.value?.daily.temperature_2m_min[4] ?? NaN)
        : NaN,
    },
    {
      date: data.value?.daily.time[5],
      weatherConditionIconPath: data.value?.daily.weather_code
        ? WEATHER_CODE_MAP.get(data.value?.daily.weather_code[5] ?? NaN)
        : "",

      tempHigh: data.value?.daily.temperature_2m_max
        ? Math.round(data.value?.daily.temperature_2m_max[5] ?? NaN)
        : NaN,
      tempLow: data.value?.daily.temperature_2m_min
        ? Math.round(data.value?.daily.temperature_2m_min[5] ?? NaN)
        : NaN,
    },
    {
      date: data.value?.daily.time[6],
      weatherConditionIconPath: data.value?.daily.weather_code
        ? WEATHER_CODE_MAP.get(data.value?.daily.weather_code[6] ?? NaN)
        : "",

      tempHigh: data.value?.daily.temperature_2m_max
        ? Math.round(data.value?.daily.temperature_2m_max[6] ?? NaN)
        : NaN,
      tempLow: data.value?.daily.temperature_2m_min
        ? Math.round(data.value?.daily.temperature_2m_min[6] ?? NaN)
        : NaN,
    },
  ];
});

const hourlyForecasts = computed(() => {
  return [
    {
      weatherConditionIconPath: data.value?.hourly.weather_code
        ? WEATHER_CODE_MAP.get(data.value.hourly.weather_code[0] ?? NaN)
        : "",
      date: data.value?.hourly.time[0],
      temp: data.value?.hourly.temperature_2m
        ? Math.round(data.value.hourly.temperature_2m[0] ?? NaN)
        : NaN,
    },
    {
      weatherConditionIconPath: data.value?.hourly.weather_code
        ? WEATHER_CODE_MAP.get(data.value.hourly.weather_code[1] ?? NaN)
        : "",
      date: data.value?.hourly.time[1],
      temp: data.value?.hourly.temperature_2m
        ? Math.round(data.value.hourly.temperature_2m[1] ?? NaN)
        : NaN,
    },
    {
      weatherConditionIconPath: data.value?.hourly.weather_code
        ? WEATHER_CODE_MAP.get(data.value.hourly.weather_code[2] ?? NaN)
        : "",
      date: data.value?.hourly.time[2],
      temp: data.value?.hourly.temperature_2m
        ? Math.round(data.value.hourly.temperature_2m[2] ?? NaN)
        : NaN,
    },
    {
      weatherConditionIconPath: data.value?.hourly.weather_code
        ? WEATHER_CODE_MAP.get(data.value.hourly.weather_code[3] ?? NaN)
        : "",
      date: data.value?.hourly.time[3],
      temp: data.value?.hourly.temperature_2m
        ? Math.round(data.value.hourly.temperature_2m[3] ?? NaN)
        : NaN,
    },
    {
      weatherConditionIconPath: data.value?.hourly.weather_code
        ? WEATHER_CODE_MAP.get(data.value.hourly.weather_code[4] ?? NaN)
        : "",
      date: data.value?.hourly.time[4],
      temp: data.value?.hourly.temperature_2m
        ? Math.round(data.value.hourly.temperature_2m[4] ?? NaN)
        : NaN,
    },
    {
      weatherConditionIconPath: data.value?.hourly.weather_code
        ? WEATHER_CODE_MAP.get(data.value.hourly.weather_code[5] ?? NaN)
        : "",
      date: data.value?.hourly.time[5],
      temp: data.value?.hourly.temperature_2m
        ? Math.round(data.value.hourly.temperature_2m[5] ?? NaN)
        : NaN,
    },
    {
      weatherConditionIconPath: data.value?.hourly.weather_code
        ? WEATHER_CODE_MAP.get(data.value.hourly.weather_code[6] ?? NaN)
        : "",
      date: data.value?.hourly.time[6],
      temp: data.value?.hourly.temperature_2m
        ? Math.round(data.value.hourly.temperature_2m[6] ?? NaN)
        : NaN,
    },
    {
      weatherConditionIconPath: data.value?.hourly.weather_code
        ? WEATHER_CODE_MAP.get(data.value.hourly.weather_code[7] ?? NaN)
        : "",
      date: data.value?.hourly.time[7],
      temp: data.value?.hourly.temperature_2m
        ? Math.round(data.value.hourly.temperature_2m[7] ?? NaN)
        : NaN,
    },
  ];
});
</script>

<template>
  <TheHeader />

  <main class="flex flex-col items-center justify-center gap-8">
    <h1 class="font-grotesque text-5xl">How's the sky looking today?</h1>

    <SearchBar />

    <p v-if="error || currentTempRounded == undefined">{{ error }}</p>

    <section v-else class="grid grid-cols-3 gap-4">
      <CurrentWeatherCard
        :city="'Batangas'"
        :country="'Philippines'"
        :currentTemp="currentTempRounded"
        :weatherConditionIconPath
        :weatherDescription
        :date="data?.current.time as Date"
      />

      <section class="col-span-2">
        <ul class="flex gap-4">
          <WeatherHighlightCard
            v-for="weatherHighlight in weatherHighlights"
            :key="weatherHighlight.type"
            :type="weatherHighlight.type"
            :value="weatherHighlight.value"
          />
        </ul>
      </section>

      <section class="col-span-2 flex flex-col gap-4">
        <h2>Daily Forecast</h2>
        <ul class="flex gap-4">
          <DailyForecastItem
            v-for="dailyForecast in dailyForecasts"
            :key="dailyForecast.date?.toTimeString()"
            :weatherConditionIconPath="dailyForecast.weatherConditionIconPath ?? ''"
            :weatherConditionDescription="`uhmm`"
            :date="dailyForecast.date as Date"
            :temp-high="dailyForecast.tempHigh"
            :temp-low="dailyForecast.tempLow"
          />
        </ul>
      </section>

      <section
        class="col-start-3 row-start-1 row-end-4 flex flex-col gap-4 rounded-xl bg-neutral-800 px-4 py-6"
      >
        <div>
          <h2 class="font-bold">Hourly Forecast</h2>
        </div>
        <ul class="flex flex-col gap-3">
          <HourlyForecastItem
            v-for="hourlyForecast in hourlyForecasts"
            :key="hourlyForecast.date?.toTimeString()"
            :weatherConditionIconPath="hourlyForecast.weatherConditionIconPath ?? ''"
            :date="hourlyForecast.date as Date"
            :weatherConditionDescription="'uhmmm'"
            :temp="Number(hourlyForecast.temp)"
          />
        </ul>
      </section>
    </section>
  </main>
</template>
