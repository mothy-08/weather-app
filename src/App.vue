<script setup lang="ts">
import { ref } from 'vue'
import ForecastDayCard from './components/ForecastDayCard.vue'
import WeatherMetricCard from './components/WeatherMetricCard.vue'

const placeholderStatus = ref([
  {
    type: 'Feels like',
    value: 18,
    unit: '°',
  },
  {
    type: 'Humidity',
    value: 46,
    unit: '%',
  },
  {
    type: 'Wind',
    value: 14,
    unit: ' km/h',
  },
  {
    type: 'Precipitation',
    value: 0,
    unit: ' mm',
  },
])

const placeholderForecasts = ref([
  {
    dayLabel: 'Tue',
    conditionFileName: 'icon-drizzle.webp',
    tempHigh: 20,
    tempLow: 14,
  },
  {
    dayLabel: 'Wed',
    conditionFileName: 'icon-rain.webp',
    tempHigh: 21,
    tempLow: 15,
  },
  {
    dayLabel: 'Thu',
    conditionFileName: 'icon-sunny.webp',
    tempHigh: 24,
    tempLow: 14,
  },
  {
    dayLabel: 'Fri',
    conditionFileName: 'icon-partly-cloudy.webp',
    tempHigh: 25,
    tempLow: 13,
  },
  {
    dayLabel: 'Sat',
    conditionFileName: 'icon-storm.webp',
    tempHigh: 21,
    tempLow: 15,
  },
  {
    dayLabel: 'Sun',
    conditionFileName: 'icon-snow.webp',
    tempHigh: 26,
    tempLow: 16,
  },
  {
    dayLabel: 'Mon',
    conditionFileName: 'icon-fog.webp',
    tempHigh: 24,
    tempLow: 15,
  },
])
</script>

<template>
  <header class="flex justify-between px-16 py-8">
    <div>
      <img src="./assets/images/logo.svg" alt="Weather app logo" />
    </div>
    <!-- dropdown -->
    <div>
      <!-- settings icon -->
      <span>Units</span>
      <!-- arrow down icon  -->
    </div>
  </header>

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
    <section>
      <div class="relative">
        <img
          class="absolute top-0 left-0"
          src="./assets/images/bg-today-large.svg"
          alt="Purple background displaying weather today"
        />
        <p>hello there</p>
      </div>
    </section>

    <!-- status cards -->
    <section class="flex gap-6">
      <WeatherMetricCard
        v-for="stat in placeholderStatus"
        :key="stat.type"
        :type="stat.type"
        :value="stat.value"
        :unit="stat.unit"
      />
    </section>

    <section class="grid gap-2">
      <h2>Daily Forecast</h2>
      <div class="flex gap-4">
        <ForecastDayCard
          v-for="forecast in placeholderForecasts"
          :key="forecast.dayLabel"
          :dayLabel="forecast.dayLabel"
          :conditionFileName="forecast.conditionFileName"
          :tempHigh="forecast.tempHigh"
          :tempLow="forecast.tempLow"
        />
      </div>
    </section>
  </main>
</template>
