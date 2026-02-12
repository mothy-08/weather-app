<script setup lang="ts">
import DegreeSymbol from "./DegreeSymbol.vue";

defineProps<{
  weatherConditionIconPath: string;
  weatherIconDescription: string;
  isoDate: string;
  hour12: string;
  temp: number;
}>();
</script>

<template>
  <li
    class="flex items-center justify-between rounded-lg border border-neutral-600 bg-neutral-700 p-2"
  >
    <div class="flex items-center gap-2">
      <img :src="weatherConditionIconPath" :alt="weatherIconDescription" width="32" height="32" />
      <time :datetime="isoDate"> {{ hour12 }} </time>
    </div>

    <data :value="temp" class="text-sm font-semibold text-neutral-200">
      {{ temp }}<DegreeSymbol />
    </data>
  </li>
</template>
