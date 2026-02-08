<script setup lang="ts"></script>

<template>
  <header class="flex justify-between px-16 py-8">
    <div>
      <img src="./assets/images/logo.svg" alt="Weather app logo" />
    </div>
    <!-- dropdown -->
    <div>
      <!-- settings icon -->
      <span>Units</span>
      <!-- arrow down icon  -->
    </div>
  </header>

  <main class="flex flex-col items-center justify-center gap-8">
    <h1 class="font-grotesque text-5xl">How's the sky looking today?</h1>

    <div class="flex items-center justify-center gap-4 text-base">
      <div class="flex w-96 items-center gap-3 rounded-lg bg-neutral-800 px-5 py-2">
        <img src="./assets/images/icon-search.svg" alt="Search icon" />
        <input
          type="text"
          class="placeholder:font-medium placeholder:text-neutral-200"
          placeholder="Search for a place..."
        />
      </div>

      <button class="rounded-lg bg-blue-500 px-5 py-2 font-medium">Search</button>
    </div>
  </main>
</template>
