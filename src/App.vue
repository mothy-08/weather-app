<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import SearchBar from "./components/SearchBar.vue";
import CurrentWeatherCard from "./components/CurrentWeatherCard.vue";
import { useWeather } from "./useWeather";
import { computed, ref, watchEffect } from "vue";
import WeatherHighlightCard from "./components/WeatherHighlightCard.vue";
import DailyForecastItem from "./components/DailyForecastItem.vue";
import HourlyForecastItem from "./components/HourlyForecastItem.vue";
import DaysDropdown from "./components/DaysDropdown.vue"; // Ensure this component emits 'select'
import WeatherSkeleton from "./components/WeatherSkeleton.vue";

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

const { data, isLoading, error } = useWeather(currentLoc);

// Reactive State for filtering
const selectedDate = ref<string>("");

const overview = computed(() => data.value?.overview);
const highlight = computed(() => data.value?.highlight);
const dailies = computed(() => data.value?.daily || []);
const hourlies = computed(() => data.value?.hourly || []);

// 1. Auto-select "Today" when data loads
watchEffect(() => {
  if (dailies.value.length > 0 && !selectedDate.value) {
    selectedDate.value = dailies.value[0]!.date;
  }
});

// 2. Filter logic: Match Daily AND ensure Future Time
const filteredHourlies = computed(() => {
  if (!selectedDate.value) return [];

  // CRITICAL: Use the location's time (from API), not the user's system clock.
  // This ensures timezone accuracy (e.g., viewing Tokyo from New York).
  const locationNow = overview.value?.date;

  return hourlies.value.filter((item) => {
    // 1. Is it the selected day?
    const isSameDay = item.date.startsWith(selectedDate.value);

    // 2. Is it in the future?
    // We compare ISO strings directly ("2026-02-15T16:00" > "2026-02-15T15:00")
    // If locationNow is missing (loading), we default to true to show everything.
    const isFuture = locationNow ? item.date > locationNow : true;

    return isSameDay && isFuture;
  });
});

function handleLocationSelect(payload: {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
}) {
  currentLoc.value = {
    coordinates: { latitude: payload.latitude, longitude: payload.longitude },
    location: { city: payload.name, country: payload.country || "" },
  };
  // Reset selection on location change
  selectedDate.value = "";
}
</script>

<template>
  <TheHeader />

  <main class="flex flex-col items-center justify-center gap-8 pb-10">
    <h1 class="font-grotesque text-5xl">How's the sky looking today?</h1>

    <SearchBar @select-location="handleLocationSelect" />

    <p v-if="error" class="text-red-500">{{ error }}</p>

    <WeatherSkeleton v-else-if="isLoading || !data" />

    <section v-else class="grid w-full max-w-5xl grid-cols-3 gap-4">
      <CurrentWeatherCard v-bind="overview!" />

      <section class="col-span-2">
        <ul class="flex gap-4">
          <WeatherHighlightCard v-bind="highlight!" />
        </ul>
      </section>

      <section class="col-span-2 flex flex-col gap-4">
        <h2>Daily Forecast</h2>
        <ul class="flex gap-4 overflow-x-auto pb-2">
          <DailyForecastItem
            v-for="daily in dailies"
            :key="daily.date"
            v-bind="daily"
            class="cursor-pointer transition-colors"
            :class="selectedDate === daily.date ? 'ring-2 ring-white' : ''"
            @click="selectedDate = daily.date"
          />
        </ul>
      </section>

      <section
        class="col-start-3 row-start-1 row-end-4 flex flex-col gap-4 rounded-xl bg-neutral-800 px-4 py-6"
      >
        <div class="flex items-center justify-between">
          <h2 class="font-bold">Hourly Forecast</h2>

          <DaysDropdown :items="dailies" v-model="selectedDate" />
        </div>

        <ul
          class="scrollbar-thin flex h-150 flex-col gap-3 overflow-y-auto pr-2"
        >
          <HourlyForecastItem
            v-for="hourly in filteredHourlies"
            :key="hourly.date"
            v-bind="hourly"
          />
          <li
            v-if="filteredHourlies.length === 0"
            class="py-4 text-center text-sm text-neutral-400"
          >
            No hourly data for this date.
          </li>
        </ul>
      </section>
    </section>
  </main>
</template>
