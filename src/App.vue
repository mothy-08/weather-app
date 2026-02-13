<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import SearchBar from "./components/SearchBar.vue";
import CurrentWeatherCard from "./components/CurrentWeatherCard.vue";
import { useWeather } from "./useWeather";
import { computed, ref } from "vue";
import WeatherHighlightCard from "./components/WeatherHighlightCard.vue";
import DailyForecastItem from "./components/DailyForecastItem.vue";
import HourlyForecastItem from "./components/HourlyForecastItem.vue";
import DaysDropdown from "./components/DaysDropdown.vue";

const currentLoc = ref({
  coordinates: {
    latitude: 13.7567,
    longitude: 121.0584,
  },
  location: {
    city: "Batangas",
    country: "Philippines",
  },
});

const { data, error } = useWeather(currentLoc.value);

const overview = computed(() => data.value?.overview);
const highlight = computed(() => data.value?.highlight);
const dailies = computed(() => data.value?.daily);
const hourlies = computed(() => data.value?.hourly);
</script>

<template>
  <TheHeader />

  <main class="flex flex-col items-center justify-center gap-8">
    <h1 class="font-grotesque text-5xl">How's the sky looking today?</h1>

    <SearchBar />

    <p v-if="error || !overview || !highlight || !dailies || !hourlies">
      {{ error }}
    </p>

    <section v-else class="grid grid-cols-3 gap-4">
      <CurrentWeatherCard v-bind="overview" />

      <section class="col-span-2">
        <ul class="flex gap-4">
          <WeatherHighlightCard v-bind="highlight" />
        </ul>
      </section>

      <section class="col-span-2 flex flex-col gap-4">
        <h2>Daily Forecast</h2>
        <ul class="flex gap-4">
          <DailyForecastItem
            v-for="daily in dailies"
            :key="daily.isoDateOnly"
            v-bind="daily"
          />
        </ul>
      </section>

      <section
        class="col-start-3 row-start-1 row-end-4 flex flex-col gap-4 rounded-xl bg-neutral-800 px-4 py-6"
      >
        <div class="flex items-center justify-between">
          <h2 class="font-bold">Hourly Forecast</h2>
          <DaysDropdown currentDay="Tuesday" />
        </div>
        <ul class="flex flex-col gap-3">
          <HourlyForecastItem
            v-for="hourly in hourlies"
            :key="hourly.isoDate"
            v-bind="hourly"
          />
        </ul>
      </section>
    </section>
  </main>
</template>
