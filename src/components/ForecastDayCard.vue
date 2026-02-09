<script setup lang="ts">
// simple props for now
defineProps<{
  dayLabel: string // TODO: convert to Date
  conditionFileName: string
  tempHigh: number
  tempLow: number
}>()
</script>

<template>
  <div
    class="flex min-w-24 flex-col items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-2 py-3"
  >
    <div>{{ dayLabel }}</div>
    <div>
      <img :src="`/images/${conditionFileName}`" alt="" width="64px" />
    </div>
    <div class="flex w-full justify-between">
      <span>{{ tempHigh }}°</span>
      <span>{{ tempLow }}°</span>
    </div>
  </div>
</template>
