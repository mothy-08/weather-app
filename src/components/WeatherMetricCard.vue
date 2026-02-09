<script setup lang="ts">
defineProps<{
  type: string
  value: number
  unit: string
}>()
</script>

<template>
  <div class="flex min-w-44 flex-col gap-3 rounded-xl border border-neutral-700 bg-neutral-800 p-4">
    <span class="text-lg font-medium text-neutral-200">{{ type }}</span>
    <span class="text-neutral-0 text-3xl font-light">{{ value }}{{ unit }}</span>
  </div>
</template>
