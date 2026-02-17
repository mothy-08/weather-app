<script setup lang="ts">
import { Button } from "./ui/button";
import IconError from "@/assets/icons/icon-error.svg";
import IconRetry from "@/assets/icons/icon-retry.svg";

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <section role="alert" class="flex flex-col items-center justify-center gap-4">
    <IconError aria-hidden="true" />
    <div class="flex flex-col items-center justify-center gap-4">
      <h1 class="text-5xl font-extrabold">Something went wrong</h1>
      <p
        class="max-w-[40ch] text-center text-base font-semibold text-neutral-200"
      >
        We couldn't connect to the server (API error). Please try again in a few
        moment.
      </p>
    </div>
    <Button @click="emit('retry')" class="bg-neutral-800">
      <IconRetry aria-hidden="true" class="h-16 w-16" />
      Retry
    </Button>
  </section>
</template>
