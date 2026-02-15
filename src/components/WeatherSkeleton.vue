<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
    <div class="flex flex-col gap-6">
      <div
        class="relative flex h-100 flex-col items-center justify-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8"
      >
        <Skeleton class="h-8 w-48 bg-neutral-800" />
        <Skeleton class="h-6 w-32 bg-neutral-800" />
        <div class="mt-8 flex items-center gap-8">
          <Skeleton class="h-32 w-32 rounded-full bg-neutral-800" />
          <Skeleton class="h-32 w-48 bg-neutral-800" />
        </div>
      </div>

      <section>
        <Skeleton class="mb-4 h-7 w-48 bg-neutral-800" />
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            v-for="i in 4"
            :key="i"
            class="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5"
          >
            <Skeleton class="h-4 w-20 bg-neutral-800" />
            <Skeleton class="h-8 w-24 bg-neutral-800" />
          </div>
        </div>
      </section>

      <section>
        <Skeleton class="mb-4 h-7 w-48 bg-neutral-800" />
        <div class="flex gap-4 overflow-hidden">
          <div
            v-for="i in 7"
            :key="i"
            class="flex min-w-35 flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4"
          >
            <Skeleton class="h-4 w-12 bg-neutral-800" />
            <Skeleton class="h-16 w-16 rounded-full bg-neutral-800" />
            <div class="flex w-full justify-between px-2">
              <Skeleton class="h-4 w-8 bg-neutral-800" />
              <Skeleton class="h-4 w-8 bg-neutral-800" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <aside
      class="flex h-full flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6"
    >
      <div class="flex items-center justify-between">
        <Skeleton class="h-7 w-32 bg-neutral-800" />
        <Skeleton class="h-9 w-24 rounded-md bg-neutral-800" />
      </div>

      <div class="flex flex-col gap-3">
        <div
          v-for="i in 8"
          :key="i"
          class="flex items-center justify-between rounded-lg bg-neutral-800/50 p-4"
        >
          <div class="flex items-center gap-3">
            <Skeleton class="h-8 w-8 rounded-full bg-neutral-800" />
            <Skeleton class="h-4 w-16 bg-neutral-800" />
          </div>
          <Skeleton class="h-4 w-12 bg-neutral-800" />
        </div>
      </div>
    </aside>
  </div>
</template>
