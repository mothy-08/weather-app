<script setup lang="ts">
import { ref, watch } from "vue"; // Import watch
import Button from "./ui/button/Button.vue";
import Input from "./ui/input/Input.vue";

interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

const city = ref("");
const results = ref<GeoResult[]>([]);
const selectedIndex = ref(-1); // Tracks keyboard selection

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

// Reset selection when results change or user types
watch(results, () => {
  selectedIndex.value = -1;
});

async function searchCity() {
  if (!city.value) return;

  // If user hits Enter with a selection, pick it instead of fetching
  if (selectedIndex.value >= 0 && results.value[selectedIndex.value]) {
    selectResult(results.value[selectedIndex.value]);
    return;
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city.value,
  )}&count=10&language=en&format=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    results.value = data.results || [];
  } catch (e) {
    console.error("Geocoding failed", e); // Don't fail silently like a coward
    results.value = [];
  }
}

function selectResult(result: GeoResult) {
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
      e.preventDefault(); // Stop cursor from moving in input
      // Cycle forward or stop at end? Let's cycle for speed.
      selectedIndex.value =
        selectedIndex.value === results.value.length - 1
          ? 0
          : selectedIndex.value + 1;
      break;

    case "ArrowUp":
      e.preventDefault();
      // Cycle backward
      selectedIndex.value =
        selectedIndex.value <= 0
          ? results.value.length - 1
          : selectedIndex.value - 1;
      break;

    case "Escape":
      results.value = [];
      (e.target as HTMLInputElement).blur();
      break;

    // 'Enter' is handled by the form submit handler calling searchCity
  }
}
</script>

<template>
  <form @submit.prevent="searchCity" class="flex items-center gap-3">
    <search
      class="focus-within:outline-ring relative flex w-96 items-center gap-3 rounded-lg bg-neutral-800 pl-4 outline"
    >
      <img
        src="/images/icon-search.svg"
        alt="Search icon"
        width="16"
        height="16"
      />
      <Input
        type="text"
        id="search"
        name="q"
        class="border-none accent-amber-200 focus-visible:ring-0"
        placeholder="Search for a place..."
        v-model.trim.lazy="city"
        @keydown="handleKeydown"
      />

      <ul
        v-if="results.length"
        class="absolute top-full left-0 z-10 mt-2 w-full overflow-hidden rounded-md bg-neutral-800 shadow-lg"
      >
        <li
          v-for="(result, index) in results"
          :key="result.id"
          @click="selectResult(result)"
          class="cursor-pointer px-4 py-2"
          :class="{
            'bg-neutral-700': index === selectedIndex,
            'hover:bg-neutral-800': index !== selectedIndex,
          }"
        >
          {{ result.name }}, {{ result.country }}
        </li>
      </ul>
    </search>

    <Button type="submit" class="cursor-pointer bg-blue-500 hover:bg-blue-700"
      >Search</Button
    >
  </form>
</template>
