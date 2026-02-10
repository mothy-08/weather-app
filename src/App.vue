<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import WeatherHighlightCard from "./components/WeatherHighlightCard.vue";
import DailyForecastItem from "./components/DailyForecastItem.vue";
import HourlyForecastItem from "./components/HourlyForecastItem.vue";
import CurrentWeatherCard from "./components/CurrentWeatherCard.vue";

const placeholderStatus = [
  {
    type: "feelsLike",
    value: 18,
  },
  {
    type: "humidity",
    value: 46,
  },
  {
    type: "wind",
    value: 14,
  },
  {
    type: "precipitation",
    value: 0,
  },
] as const;

const placeholderDailyForecasts = [
  {
    date: "2026-02-03",
    conditionFileName: "icon-drizzle.webp",
    tempHigh: 20,
    tempLow: 14,
  },
  {
    date: "2026-02-04",
    conditionFileName: "icon-rain.webp",
    tempHigh: 21,
    tempLow: 15,
  },
  {
    date: "2026-02-05",
    conditionFileName: "icon-sunny.webp",
    tempHigh: 24,
    tempLow: 14,
  },
  {
    date: "2026-02-06",
    conditionFileName: "icon-partly-cloudy.webp",
    tempHigh: 25,
    tempLow: 13,
  },
  {
    date: "2026-02-07",
    conditionFileName: "icon-storm.webp",
    tempHigh: 21,
    tempLow: 15,
  },
  {
    date: "2026-02-08",
    conditionFileName: "icon-snow.webp",
    tempHigh: 26,
    tempLow: 16,
  },
  {
    date: "2026-02-09",
    conditionFileName: "icon-fog.webp",
    tempHigh: 24,
    tempLow: 15,
  },
];

const placeholderHourlyForecast = [
  {
    weatherConditionIconPath: "icon-overcast.webp",
    date: "2026-02-09T03:00:00",
    temp: 20,
  },
  {
    weatherConditionIconPath: "icon-partly-cloudy.webp",
    date: "2026-02-09T04:00:00",
    temp: 20,
  },
  {
    weatherConditionIconPath: "icon-sunny.webp",
    date: "2026-02-09T05:00:00",
    temp: 20,
  },
  {
    weatherConditionIconPath: "icon-overcast.webp",
    date: "2026-02-09T06:00:00",
    temp: 19,
  },
  {
    weatherConditionIconPath: "icon-snow.webp",
    date: "2026-02-09T07:00:00",
    temp: 18,
  },
  {
    weatherConditionIconPath: "icon-fog.webp",
    date: "2026-02-09T08:00:00",
    temp: 18,
  },
  {
    weatherConditionIconPath: "icon-snow.webp",
    date: "2026-02-09T09:00:00",
    temp: 17,
  },
  {
    weatherConditionIconPath: "icon-overcast.webp",
    date: "2026-02-09T10:00:00",
    temp: 17,
  },
];
</script>

<template>
  <TheHeader />

  <main class="flex flex-col items-center justify-center gap-8">
    <h1 class="font-grotesque text-5xl">How's the sky looking today?</h1>

    <div class="flex items-center justify-center gap-4 text-base">
      <div class="flex w-96 items-center gap-3 rounded-lg bg-neutral-800 px-5 py-2">
        <img src="/images/icon-search.svg" alt="Search icon" />
        <input
          type="text"
          class="placeholder:font-medium placeholder:text-neutral-200 focus-visible:outline-none"
          placeholder="Search for a place..."
        />
      </div>

      <button class="cursor-pointer rounded-lg bg-blue-500 px-5 py-2 font-medium">Search</button>
    </div>

    <!-- main card -->
    <!-- <section class="bg-[url(/images/bg-today-large.svg)] bg-cover bg-center bg-no-repeat"> -->
    <!--   <p>hello there</p> -->
    <!-- </section> -->
    <CurrentWeatherCard
      :city="'Batangas'"
      :country="'Philippines'"
      :currentTemp="20"
      :weatherConditionIconPath="'/images/icon-sunny.webp'"
      :weatherDescription="'Sunny Weather'"
      :date="new Date('2026-02-10T03:00:00')"
    />

    <!-- status cards -->
    <section class="flex gap-6">
      <WeatherHighlightCard
        v-for="stat in placeholderStatus"
        :key="stat.type"
        :type="stat.type"
        :value="stat.value"
      />
    </section>

    <section class="grid gap-2">
      <h2>Daily Forecast</h2>
      <div class="flex gap-4">
        <DailyForecastItem
          v-for="forecast in placeholderDailyForecasts"
          :key="forecast.date"
          :date="new Date(forecast.date)"
          :weatherConditionIconPath="forecast.conditionFileName"
          :tempHigh="forecast.tempHigh"
          :tempLow="forecast.tempLow"
        />
      </div>
    </section>

    <!-- hourly forecast -->
    <section>
      <div class="flex flex-col gap-3">
        <div>
          <h2>Hourly Forecast</h2>
          <!-- dropdown here -->
        </div>
        <HourlyForecastItem
          v-for="hourlyForecast in placeholderHourlyForecast"
          :key="hourlyForecast.date"
          :date="new Date(hourlyForecast.date)"
          :weatherConditionIconPath="hourlyForecast.weatherConditionIconPath"
          :temp="hourlyForecast.temp"
        />
      </div>
    </section>
  </main>
</template>
