<script setup lang="ts">
import { computed } from "vue";

const WEATHER_METRIC = {
  feelsLike: { label: "Feels Like", unit: "°" },
  humidity: { label: "Humidity", unit: "%" },
  wind: { label: "Wind", unit: { metric: "km/h", imperial: "mph" } },
  precipitation: { label: "Precipitation", unit: { metric: "mm", imperial: "in" } },
};

const props = defineProps<{
  type: keyof typeof WEATHER_METRIC;
  value: number;
  system?: "metric" | "imperial";
}>();

const metric = computed(() => WEATHER_METRIC[props.type]);

const unit = computed(() => {
  const givenUnit = metric.value.unit;
  if (typeof givenUnit === "string") {
    return givenUnit;
  }
  return givenUnit[props.system ?? "metric"];
});
</script>

<template>
  <div class="flex min-w-44 flex-col gap-3 rounded-xl border border-neutral-700 bg-neutral-800 p-4">
    <span class="text-lg font-medium text-neutral-200">{{ metric.label }}</span>
    <span class="text-neutral-0 text-3xl font-light">{{ value }}{{ unit }}</span>
  </div>
</template>
