<script setup lang="ts">
import type { Nowcast } from "@/lib/types";
import { computed } from "vue";
import { useUnits } from "@/composables/useUnits";
import { celsiusToFahrenheit } from "@/lib/converters";

const props = defineProps<Nowcast>();
const { tempUnit } = useUnits();

const displayTemp = computed(() =>
  tempUnit.value === "c" ? props.temp : celsiusToFahrenheit(props.temp),
);
</script>

<template>
  <article
    class="flex flex-1 flex-col rounded-2xl bg-[url('@/assets/images/bg-today-large.svg')] bg-cover bg-center bg-no-repeat py-10 md:col-span-2 md:row-span-1 md:min-w-1/2 md:flex-row md:items-center md:justify-between md:bg-[url('@/assets/images/bg-today-large.svg')] md:px-5 md:py-20"
  >
    <div class="flex flex-col items-center gap-2 md:items-start">
      <h2 class="text-2xl font-bold">{{ city }}, {{ country }}</h2>
      <time :datetime="date" class="text-base font-semibold text-neutral-200">
        {{ weekdayWithDate }}
      </time>
    </div>

    <div class="flex items-center justify-center">
      <img :src="icon.src" :alt="icon.alt" width="128" height="128" />
      <data :value="displayTemp" class="text-8xl font-bold italic">
        {{ displayTemp }}°
      </data>
    </div>
  </article>
</template>
