<script setup lang="ts">
import { computed } from "vue";
import DegreeSymbol from "./DegreeSymbol.vue";

const { date } = defineProps<{
  date: Date;
  weatherConditionIconPath: string;
  weatherConditionDescription: string;
  tempHigh: number;
  tempLow: number;
}>();

const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const weekdayShort = computed(() => dateFormatter.format(date));

const isoDateOnly = computed(() => date.toISOString().slice(0, 10));
</script>

<template>
  <li
    class="flex min-w-24 flex-col items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-2 py-3"
  >
    <time :datetime="isoDateOnly">{{ weekdayShort }}</time>

    <img
      :src="weatherConditionIconPath"
      :alt="weatherConditionDescription"
      width="64"
      height="64"
    />

    <div class="flex w-full justify-between">
      <data :value="tempHigh">{{ tempHigh }}<DegreeSymbol /></data>
      <data :value="tempLow">{{ tempLow }}<DegreeSymbol /></data>
    </div>
  </li>
</template>
