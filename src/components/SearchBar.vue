<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "./ui/button/Button.vue";
import Input from "./ui/input/Input.vue";
import SearchIcon from "@/assets/icons/icon-search.svg";
import LoadingIcon from "@/assets/icons/icon-loading.svg";

interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

const city = ref("");
const results = ref<GeoResult[]>([]);
const selectedIndex = ref(-1);
const isLoading = ref(false);

let isSelectionUpdate = false;
let debounceTimer: ReturnType<typeof setTimeout>;

const emit = defineEmits<{
  (
    e: "select-location",
    payload: {
      latitude: number;
      longitude: number;
      name: string;
      country?: string;
    },
  ): void;
}>();

watch(city, (newVal) => {
  if (isSelectionUpdate) {
    isSelectionUpdate = false;
    return;
  }

  clearTimeout(debounceTimer);

  if (!newVal) {
    results.value = [];
    isLoading.value = false;
    return;
  }

  debounceTimer = setTimeout(() => {
    performSearch();
  }, 500);
});

watch(results, () => {
  selectedIndex.value = -1;
});

function handleEnter() {
  clearTimeout(debounceTimer);

  if (!city.value) return;

  const selectedItem = results.value[selectedIndex.value];

  if (selectedItem) {
    selectResult(selectedItem);
  } else {
    performSearch();
  }
}

async function performSearch() {
  const currentQuery = city.value;
  isLoading.value = true;

  results.value = [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city.value,
  )}&count=10&language=en&format=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (city.value === currentQuery) {
      results.value = data.results || [];
    }
  } catch (e) {
    console.error("Geocoding failed", e);
    results.value = [];
  } finally {
    if (city.value === currentQuery) {
      isLoading.value = false;
    }
  }
}

function selectResult(result: GeoResult) {
  isSelectionUpdate = true;

  city.value = result.name;

  emit("select-location", {
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    country: result.country,
  });

  results.value = [];
  selectedIndex.value = -1;
}

function handleKeydown(e: KeyboardEvent) {
  if (!results.value.length) return;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      selectedIndex.value =
        selectedIndex.value === results.value.length - 1
          ? 0
          : selectedIndex.value + 1;
      break;

    case "ArrowUp":
      e.preventDefault();
      selectedIndex.value =
        selectedIndex.value <= 0
          ? results.value.length - 1
          : selectedIndex.value - 1;
      break;

    case "Escape":
      results.value = [];
      (e.target as HTMLInputElement).blur();
      break;
  }
}
</script>

<template>
  <form
    @submit.prevent="handleEnter"
    class="flex flex-col items-center justify-center gap-3 md:flex-row"
  >
    <search
      class="focus-within:outline-ring relative flex w-full items-center gap-3 rounded-lg bg-neutral-800 pl-4 outline outline-transparent md:w-96"
    >
      <SearchIcon />
      <Input
        type="text"
        id="search"
        name="q"
        class="border-none accent-amber-200 focus-visible:ring-0"
        placeholder="Search for a place..."
        v-model.trim="city"
        autocomplete="off"
        @keydown="handleKeydown"
      />

      <div
        v-if="isLoading"
        class="absolute top-full left-0 z-10 mt-2 flex w-full items-center gap-2 rounded-md bg-neutral-800 p-4 shadow-lg"
      >
        <LoadingIcon class="animate-spin" />
        <span class="text-sm text-neutral-200">Search in progress</span>
      </div>

      <ul
        v-else-if="results.length"
        class="absolute top-full left-0 z-10 mt-2 w-full overflow-hidden rounded-md bg-neutral-800 shadow-lg"
      >
        <li
          v-for="(result, index) in results"
          :key="result.id"
          @click="selectResult(result)"
          class="cursor-pointer px-4 py-2 text-neutral-200"
          :class="{
            'bg-neutral-700': index === selectedIndex,
            'hover:bg-neutral-700': index !== selectedIndex,
          }"
        >
          {{ result.name }}, {{ result.country }}
        </li>
      </ul>
    </search>

    <Button
      type="submit"
      :disabled="isLoading"
      class="w-full cursor-pointer bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 md:w-fit"
    >
      Search
    </Button>
  </form>
</template>
