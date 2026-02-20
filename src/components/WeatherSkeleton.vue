<script setup lang="ts">
import ChevronDown from "@/assets/icons/icon-dropdown.svg";
const highlightLabels = ["Feels Like", "Humidity", "Wind", "Precipitation"];
</script>

<template>
  <section
    class="flex w-full flex-col gap-10 overflow-hidden md:grid md:max-h-[634.4px] md:grid-cols-3"
  >
    <!-- Left column: spans 2 of 3 grid columns -->
    <div class="flex flex-col gap-4 md:col-span-2">
      <!-- Main weather card -->
      <div
        class="flex h-68 w-full items-center justify-center rounded-xl bg-neutral-700 py-16 md:h-72"
      >
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-center gap-2">
            <div
              v-for="i in 3"
              :key="i"
              class="h-3 w-3 animate-bounce rounded-full bg-neutral-200"
              :class="{
                'delay-150': i === 2,
                'delay-300': i === 3,
              }"
            ></div>
          </div>
          <span>Loading...</span>
        </div>
      </div>

      <!-- Highlight stats -->
      <section class="my-auto">
        <ul class="grid grid-cols-2 gap-4 md:flex md:flex-wrap">
          <li
            v-for="label in highlightLabels"
            :key="label"
            class="flex h-27.5 flex-1 flex-col justify-between gap-3 rounded-xl border border-neutral-700 bg-neutral-800 p-4"
          >
            <h3 class="text-lg font-medium text-neutral-200">{{ label }}</h3>
            <span class="text-neutral-0 text-3xl font-light">—</span>
          </li>
        </ul>
      </section>

      <!-- Daily forecast -->
      <section class="flex flex-col justify-between gap-3">
        <h2 class="font-semibold">Daily Forecast</h2>
        <ul class="grid w-full grid-cols-3 gap-4 md:flex">
          <li
            v-for="i in 7"
            :key="i"
            class="aspect-7/10 w-full rounded-md bg-neutral-800 md:aspect-auto md:h-40.5 md:w-24"
          ></li>
        </ul>
      </section>
    </div>

    <!-- Right column: Hourly forecast sidebar -->
    <section
      class="flex max-h-120 w-full flex-col gap-4 rounded-xl bg-neutral-800 p-4 md:max-h-[634.4px]"
    >
      <div class="flex shrink-0 items-center justify-between">
        <h2 class="font-bold">Hourly Forecast</h2>
        <span
          class="flex items-center justify-between gap-2 rounded-md bg-neutral-600 px-3 py-2 text-sm"
        >
          — <ChevronDown />
        </span>
      </div>

      <ul class="flex flex-1 flex-col gap-3 overflow-y-hidden">
        <li
          v-for="i in 24"
          :key="i"
          class="flex min-h-12.5 w-full items-center justify-between rounded-lg border border-neutral-600 bg-neutral-700"
        ></li>
      </ul>
    </section>
  </section>
</template>
