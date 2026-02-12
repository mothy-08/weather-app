<script setup lang="ts">
import { computed } from "vue";
import DegreeSymbol from "./DegreeSymbol.vue";

const { date } = defineProps<{
  city: string;
  country: string;
  date: Date;
  weatherConditionIconPath: string;
  weatherDescription: string;
  currentTemp: number;
}>();

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formattedDate = computed(() => dateFormatter.format(date));

const isoDate = computed(() => date.toISOString());
</script>

<template>
  <article
    class="col-span-2 row-span-1 flex min-w-1/2 items-center justify-between rounded-2xl bg-[url(/images/bg-today-large.svg)] bg-cover bg-center bg-no-repeat px-5 py-20"
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
