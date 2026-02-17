<script setup lang="ts">
import type { WeatherHighlight } from "@/lib/types";
import { computed } from "vue";
import { useUnits } from "@/composables/useUnits";
import { celsiusToFahrenheit, kmhToMph, mmToInches } from "@/lib/converters";

const props = defineProps<WeatherHighlight>();
const { tempUnit, speedUnit, precipUnit } = useUnits();

const highlights = computed(() => {
  // 1. Convert Values
  const feelsLikeVal =
    tempUnit.value === "c"
      ? props.feelsLike
      : celsiusToFahrenheit(props.feelsLike);

  const windVal =
    speedUnit.value === "kmh" ? props.windSpeed : kmhToMph(props.windSpeed);

  const precipVal =
    precipUnit.value === "mm"
      ? props.precipitation
      : mmToInches(props.precipitation);

  // 2. Set Labels
  const wUnit = speedUnit.value === "kmh" ? " km/h" : " mph";
  const pUnit = precipUnit.value === "mm" ? " mm" : " in";

  return [
    {
      label: "Feels Like",
      value: feelsLikeVal,
      unit: "°",
    },
    {
      label: "Humidity",
      value: props.humidity,
      unit: "%",
    },
    {
      label: "Wind",
      value: windVal,
      unit: wUnit,
    },
    {
      label: "Precipitation",
      value: precipVal,
      unit: pUnit,
    },
  ];
});
</script>

<template>
  <li
    v-for="highlight in highlights"
    :key="highlight.label"
    class="flex flex-1 flex-col gap-3 rounded-xl border border-neutral-700 bg-neutral-800 p-4"
  >
    <h3 class="text-lg font-medium text-neutral-200">{{ highlight.label }}</h3>
    <data :value="highlight.value" class="text-neutral-0 text-3xl font-light">
      {{ highlight.value }}{{ highlight.unit }}
    </data>
  </li>
</template>
