<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import SearchBar from "./components/SearchBar.vue";
import CurrentWeatherCard from "./components/CurrentWeatherCard.vue";
import { useWeather } from "./useWeather";
import { computed } from "vue";
import WeatherHighlightCard from "./components/WeatherHighlightCard.vue";
import DailyForecastItem from "./components/DailyForecastItem.vue";
import HourlyForecastItem from "./components/HourlyForecastItem.vue";
import {
  formatDateWithWeekday,
  formatShortWeekdayOnly,
  formatTo12Hour,
  getIsoDate,
  getIsoDateOnly,
  getWeatherMeta,
  roundValue,
} from "./lib/utils";

const BATANGAS_COORDINATES = {
  latitude: 13.7567,
  longitude: 121.0584,
};

const { data, error } = useWeather(BATANGAS_COORDINATES);

const dailyForecasts = computed(() => {
  const dailies = data.value?.daily;

  if (!dailies) return null;

  const {
    time,
    weather_code: code,
    temperature_2m_max: tempHigh,
    temperature_2m_min: tempLow,
  } = dailies;

  if (!time || !code || !tempHigh || !tempLow) return null;

  const arr = [];

  for (let i = 0; i < Math.min(7, time.length, code.length, tempHigh.length, tempLow.length); i++) {
    const [t, c, th, tl] = [time[i], code[i], tempHigh[i], tempLow[i]];

    if (t == undefined || c == undefined || th == undefined || tl == undefined) return [];

    arr.push({
      isoDateOnly: getIsoDateOnly(t),
      shortWeekdayOnly: formatShortWeekdayOnly(t),
      weatherConditionIconPath: getWeatherMeta(c).src,
      weatherIconDescription: getWeatherMeta(c).alt,
      tempHigh: roundValue(th),
      tempLow: roundValue(tl),
    });
  }

  return arr;
});

const currentWeatherDetails = computed(() => {
  const currentValues = data.value?.current;
  if (currentValues == undefined) return null;
  const { temperature_2m: currentTemp, weather_code: code, time } = currentValues;
  return {
    city: "Batangas",
    country: "Philippines",
    formattedDateWithWeekday: formatDateWithWeekday(time),
    isoDate: getIsoDate(time),
    currentTemp: roundValue(currentTemp),
    weatherConditionIconPath: getWeatherMeta(code).src,
    weatherIconDescription: getWeatherMeta(code).alt,
  };
});

const weatherHighlights = computed(() => {
  const currentValues = data.value?.current;
  if (currentValues == undefined) return null;

  const {
    apparent_temperature: temp,
    relative_humidity_2m: humidity,
    wind_speed_10m: wind,
    precipitation,
  } = currentValues;

  return [
    {
      type: "feelsLike",
      value: roundValue(temp),
    },
    {
      type: "humidity",
      value: roundValue(humidity),
    },
    {
      type: "wind",
      value: roundValue(wind),
    },
    {
      type: "precipitation",
      value: roundValue(precipitation),
    },
  ] as const;
});

const hourlyForecasts = computed(() => {
  const hourlyValues = data.value?.hourly;
  if (hourlyValues == undefined) return null;

  const { time, weather_code: code, temperature_2m: temp } = hourlyValues;

  if (!time || !code || !temp) return null;

  // return 12 items for now
  const arr = [];

  for (let i = 0; i < 12; i++) {
    const [ti, c, tm] = [time[i], code[i], temp[i]];
    if (ti == undefined || c == undefined || tm == undefined) return null;

    arr.push({
      weatherConditionIconPath: getWeatherMeta(c).src,
      weatherIconDescription: getWeatherMeta(c).alt,
      isoDate: getIsoDate(ti),
      hour12: formatTo12Hour(ti),
      temp: roundValue(tm),
    });
  }

  return arr;
});
</script>

<template>
  <TheHeader />

  <main class="flex flex-col items-center justify-center gap-8">
    <h1 class="font-grotesque text-5xl">How's the sky looking today?</h1>

    <SearchBar />

    <p v-if="error || !currentWeatherDetails || !weatherHighlights">
      {{ error }}
    </p>

    <section v-else class="grid grid-cols-3 gap-4">
      <CurrentWeatherCard v-bind="currentWeatherDetails" />

      <section class="col-span-2">
        <ul class="flex gap-4">
          <WeatherHighlightCard
            v-for="weatherHighlight in weatherHighlights"
            :key="weatherHighlight.type"
            v-bind="weatherHighlight"
          />
        </ul>
      </section>

      <section class="col-span-2 flex flex-col gap-4">
        <h2>Daily Forecast</h2>
        <ul class="flex gap-4">
          <DailyForecastItem
            v-for="dailyForecast in dailyForecasts"
            :key="dailyForecast.isoDateOnly"
            v-bind="dailyForecast"
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
            :key="hourlyForecast.isoDate"
            v-bind="hourlyForecast"
          />
        </ul>
      </section>
    </section>
  </main>
</template>
