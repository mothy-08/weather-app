<script setup lang="ts">
import type { HourlyForecast } from "@/lib/types";
import { computed } from "vue";
import { useUnits } from "@/composables/useUnits";
import { celsiusToFahrenheit } from "@/lib/converters";

const props = defineProps<HourlyForecast>();
const { tempUnit } = useUnits();

const displayTemp = computed(() =>
  tempUnit.value === "c" ? props.temp : celsiusToFahrenheit(props.temp),
);
</script>

<template>
  <li
    class="flex items-center justify-between rounded-lg border border-neutral-600 bg-neutral-700 p-2"
  >
    <div class="flex items-center gap-2">
      <img :src="icon.src" :alt="icon.alt" width="32" height="32" />
      <time :datetime="date"> {{ hour12 }} </time>
    </div>

    <data :value="displayTemp" class="text-sm font-semibold text-neutral-200">
      {{ displayTemp }}°
    </data>
  </li>
</template>
