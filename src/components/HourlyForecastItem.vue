<script setup lang="ts">
const props = defineProps<{
  weatherConditionIconPath: string;
  date: Date;
  temp: number;
}>();

const hour = props.date.toLocaleTimeString("en-US", {
  hour: "numeric",
  hour12: true,
});
</script>

<template>
  <div
    class="flex items-center justify-between rounded-lg border border-neutral-500 bg-neutral-600"
  >
    <div>
      <img
        :src="`/images/${weatherConditionIconPath}`"
        alt="Current weather condition icon"
        width="32px"
      />
      <span>
        {{ hour }}
      </span>
    </div>
    <span> {{ temp }}° </span>
  </div>
</template>
