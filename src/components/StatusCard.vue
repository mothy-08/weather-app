<script setup lang="ts">
defineProps<{
  statusType: string
  statusValue: string
}>()
</script>

<template>
  <div class="flex flex-col items-center">
    <span>{{ statusType }}</span>
    <span>{{ statusValue }}</span>
  </div>
</template>
