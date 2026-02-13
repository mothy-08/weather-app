<script setup lang="ts">
import type { WeatherHighlight } from "@/types";
import { computed } from "vue";

const props = defineProps<WeatherHighlight>();
const highlights = computed(() => {
  return [
    {
      label: "Feels Like",
      value: props.feelsLike,
      unit: "°",
    },
    {
      label: "Humidity",
      value: props.humidity,
      unit: "%",
    },
    {
      label: "Wind",
      value: props.windSpeed,
      unit: " km/h",
    },
    {
      label: "Precipitation",
      value: props.precipitation,
      unit: " mm",
    },
  ];
});
</script>

<template>
  <li
    v-for="highlight in highlights"
    :key="highlight.label"
    class="flex min-w-44 flex-col gap-3 rounded-xl border border-neutral-700 bg-neutral-800 p-4"
  >
    <h3 class="text-lg font-medium text-neutral-200">{{ highlight.label }}</h3>
    <data :value="highlight.value" class="text-neutral-0 text-3xl font-light"
      >{{ highlight.value }}{{ highlight.unit }}</data
    >
  </li>
</template>
