<script setup lang="ts">
import type { DailyForecast } from "@/types";
import { computed } from "vue";
import { useUnits } from "@/composables/useUnits";
import { celsiusToFahrenheit } from "@/lib/converters";

const props = defineProps<DailyForecast>();
const { tempUnit } = useUnits();

const displayHigh = computed(() =>
  tempUnit.value === "c" ? props.tempHigh : celsiusToFahrenheit(props.tempHigh),
);

const displayLow = computed(() =>
  tempUnit.value === "c" ? props.tempLow : celsiusToFahrenheit(props.tempLow),
);
</script>

<template>
  <li
    class="flex min-w-24 flex-col items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-2 py-3"
  >
    <time :datetime="date">{{ weekdayShort }}</time>
    <img :src="icon.src" :alt="icon.alt" width="64" height="64" />

    <div class="flex w-full justify-between gap-2">
      <data :value="displayHigh">{{ displayHigh }}°</data>
      <data :value="displayLow" class="text-neutral-400"
        >{{ displayLow }}°</data
      >
    </div>
  </li>
</template>
