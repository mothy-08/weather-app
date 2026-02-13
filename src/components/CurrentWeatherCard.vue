<script setup lang="ts">
import type { Nowcast } from "@/types";
import DegreeSymbol from "./DegreeSymbol.vue";

defineProps<Nowcast>();
</script>

<template>
  <article
    class="col-span-2 row-span-1 flex min-w-1/2 items-center justify-between rounded-2xl bg-[url(/images/bg-today-large.svg)] bg-cover bg-center bg-no-repeat px-5 py-20"
  >
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-bold">{{ city }}, {{ country }}</h2>
      <time
        :datetime="isoDate"
        class="text-base font-semibold text-neutral-200"
        >{{ formattedDateWithWeekday }}</time
      >
    </div>

    <div class="flex items-center">
      <img
        :src="weatherConditionIconPath"
        :alt="weatherIconDescription"
        width="128"
        height="128"
      />
      <data :value="currentTemp" class="text-8xl font-bold italic">
        {{ currentTemp }}<DegreeSymbol />
      </data>
    </div>
  </article>
</template>
