<script setup lang="ts">
import { computed } from "vue";
import DegreeSymbol from "./DegreeSymbol.vue";

const { date } = defineProps<{
  weatherConditionIconPath: string;
  weatherConditionDescription: string;
  date: Date;
  temp: number;
}>();

const hour = computed(() => date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }));

const isoDate = computed(() => date.toISOString());
</script>

<template>
  <li class="flex items-center justify-between rounded-lg border border-neutral-500 bg-neutral-600">
    <div class="flex items-center gap-2">
      <img
        :src="weatherConditionIconPath"
        :alt="weatherConditionDescription"
        width="32"
        height="32"
      />
      <time :datetime="isoDate"> {{ hour }} </time>
    </div>

    <data :value="temp"> {{ temp }}<DegreeSymbol /> </data>
  </li>
</template>
