<script setup lang="ts">
import DegreeSymbol from "./DegreeSymbol.vue";

defineProps<{
  isoDateOnly: string;
  shortWeekdayOnly: string;
  weatherConditionIconPath: string;
  weatherIconDescription: string;
  tempHigh: number;
  tempLow: number;
}>();
</script>

<template>
  <li
    class="flex min-w-24 flex-col items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-2 py-3"
  >
    <time :datetime="isoDateOnly">{{ shortWeekdayOnly }}</time>

    <img :src="weatherConditionIconPath" :alt="weatherIconDescription" width="64" height="64" />

    <div class="flex w-full justify-between">
      <data :value="tempHigh">{{ tempHigh }}<DegreeSymbol /></data>
      <data :value="tempLow">{{ tempLow }}<DegreeSymbol /></data>
    </div>
  </li>
</template>
