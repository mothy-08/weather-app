<script setup lang="ts">
import type { Nowcast } from "@/types";
import DegreeSymbol from "./DegreeSymbol.vue";
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
    class="col-span-2 row-span-1 flex min-w-1/2 items-center justify-between rounded-2xl bg-[url(/images/bg-today-large.svg)] bg-cover bg-center bg-no-repeat px-5 py-20"
  >
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-bold">{{ city }}, {{ country }}</h2>
      <time :datetime="date" class="text-base font-semibold text-neutral-200">
        {{ weekdayWithDate }}
      </time>
    </div>

    <div class="flex items-center">
      <img :src="icon.src" :alt="icon.alt" width="128" height="128" />
      <data :value="displayTemp" class="text-8xl font-bold italic">
        {{ displayTemp }}<DegreeSymbol />
      </data>
    </div>
  </article>
</template>
