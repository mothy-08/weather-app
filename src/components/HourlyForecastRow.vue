<script setup lang="ts">
export type ForecastRow = {
  iconPath: string
  time: Date
  temp: number
}
defineProps<ForecastRow>()
</script>

<template>
  <div
    class="flex items-center justify-between rounded-lg border border-neutral-500 bg-neutral-600"
  >
    <div>
      <img :src="`/images/${iconPath}`" alt="" width="32px" />
      <span>
        {{
          time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
          })
        }}
      </span>
    </div>
    <span> {{ temp }}° </span>
  </div>
</template>
