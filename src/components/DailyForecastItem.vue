<script setup lang="ts">
const { date } = defineProps<{
  date: Date;
  weatherConditionIconPath: string;
  tempHigh: number;
  tempLow: number;
}>();

const weekdayShort = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
</script>

<template>
  <div
    class="flex min-w-24 flex-col items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-2 py-3"
  >
    <div>{{ weekdayShort }}</div>
    <div>
      <img
        :src="`/images/${weatherConditionIconPath}`"
        alt="Current weather condition icon"
        width="64px"
      />
    </div>
    <div class="flex w-full justify-between">
      <span>{{ tempHigh }}°</span>
      <span>{{ tempLow }}°</span>
    </div>
  </div>
</template>
