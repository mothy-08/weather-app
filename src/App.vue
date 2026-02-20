<script setup lang="ts">
import WeatherLogo from "@/assets/icons/logo.svg";
import UnitsDropdown from "./components/UnitsDropdown.vue";
import SearchBar from "./components/SearchBar.vue";
import CurrentWeatherCard from "./components/CurrentWeatherCard.vue";
import { useWeather } from "./composables/useWeather";
import { computed, ref, watch } from "vue";
import WeatherHighlightCard from "./components/WeatherHighlightCard.vue";
import DailyForecastItem from "./components/DailyForecastItem.vue";
import HourlyForecastItem from "./components/HourlyForecastItem.vue";
import DaysDropdown from "./components/DaysDropdown.vue"; // Ensure this component emits 'select'
import WeatherSkeleton from "./components/WeatherSkeleton.vue";
import SomethingWentWrong from "./components/SomethingWentWrong.vue";

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

const { data, isLoading, error, refetch } = useWeather(currentLoc);

const selectedDate = ref<string>("");

const overview = computed(() => data.value?.overview);
const highlight = computed(() => data.value?.highlight);
const dailies = computed(() => data.value?.daily || []);
const hourlies = computed(() => data.value?.hourly || []);

watch(dailies, (newDailies) => {
  if (newDailies.length === 0) return;

  const isSelectionValid = newDailies.some(
    (day) => day.date === selectedDate.value,
  );

  const curr = newDailies[0];
  if (!curr) return;
  if (!selectedDate.value || !isSelectionValid) {
    selectedDate.value = curr.date;
  }
});

const filteredHourlies = computed(() => {
  if (!selectedDate.value) return [];

  const locationNow = overview.value?.date;

  return hourlies.value.filter((item) => {
    const isSameDay = item.date.startsWith(selectedDate.value);
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
  selectedDate.value = "";
}
</script>

<template>
  <div class="mx-auto flex max-w-[90%] flex-col gap-16 py-6 md:max-w-4/5">
    <header class="flex items-center justify-between">
      <a @click.prevent href="/">
        <WeatherLogo />
      </a>
      <UnitsDropdown />
    </header>

    <SomethingWentWrong v-if="error" @retry="refetch" />

    <main v-else class="flex flex-col gap-8">
      <h1 class="font-grotesque text-center text-6xl md:text-5xl">
        How's the sky looking today?
      </h1>

      <SearchBar @select-location="handleLocationSelect" />

      <WeatherSkeleton v-if="isLoading || !data || !overview || !highlight" />

      <section v-else class="flex flex-col gap-4 md:grid md:grid-cols-3">
        <div class="flex flex-col gap-4 md:col-span-2">
          <CurrentWeatherCard v-bind="overview" />

          <section class="my-auto">
            <ul class="grid grid-cols-2 gap-4 md:flex md:flex-wrap">
              <WeatherHighlightCard v-bind="highlight" />
            </ul>
          </section>

          <section class="flex flex-col justify-between gap-3">
            <h2 class="font-semibold">Daily Forecast</h2>
            <ul class="grid min-w-0 grid-cols-3 gap-4 md:flex md:flex-wrap">
              <DailyForecastItem
                v-for="daily in dailies"
                :key="daily.date"
                v-bind="daily"
              />
            </ul>
          </section>
        </div>

        <section class="relative">
          <div
            class="flex max-h-120 flex-col gap-4 rounded-xl bg-neutral-800 py-4 pl-4 md:absolute md:inset-0 md:h-full md:max-h-full"
          >
            <div class="flex shrink-0 items-center justify-between pr-4">
              <h2 class="font-bold">Hourly Forecast</h2>
              <DaysDropdown :items="dailies" v-model="selectedDate" />
            </div>

            <ul
              class="scrollbar-thin flex flex-1 flex-col gap-3 overflow-y-scroll pr-4"
            >
              <HourlyForecastItem
                v-for="hourly in filteredHourlies"
                :key="hourly.date"
                v-bind="hourly"
              />

              <li
                v-if="filteredHourlies.length === 0"
                class="flex h-full flex-col items-center justify-center text-sm text-neutral-400"
              >
                <p>No hourly data for this date.</p>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: var(--color-neutral-700) var(--color-neutral-800);
  scrollbar-gutter: stable;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: var(--color-neutral-800);
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: var(--color-neutral-700);
  border-radius: 4px;
}
</style>
