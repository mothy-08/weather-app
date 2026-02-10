<script setup lang="ts">
import { computed } from "vue";
import DegreeSymbol from "./DegreeSymbol.vue";

// 1. Assign props to a variable. Do NOT destructure unless using Reactivity Transform.
const { date } = defineProps<{
  city: string;
  country: string;
  date: Date;
  weatherConditionIconPath: string;
  weatherDescription: string; // 2. Added this. Essential for accessibility.
  currentTemp: number;
}>();

// 3. Make the date formatting reactive.
// If props.date changes, this automatically recalculates.
const formattedDate = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
});

// 4. ISO string also needs to be computed or accessed directly in template
const isoDate = computed(() => date.toISOString());
</script>

<template>
  <article
    class="flex min-w-1/2 items-center justify-between rounded-2xl bg-[url(/images/bg-today-large.svg)] bg-cover bg-center bg-no-repeat px-5 py-20"
  >
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-bold">{{ city }}, {{ country }}</h2>
      <time :datetime="isoDate" class="text-base font-semibold text-neutral-200">{{
        formattedDate
      }}</time>
    </div>

    <div class="flex items-center">
      <img :src="weatherConditionIconPath" :alt="weatherDescription" width="128" height="128" />
      <data :value="currentTemp" class="text-8xl font-bold italic">
        {{ currentTemp }}<DegreeSymbol />
      </data>
    </div>
  </article>
</template>
