<script setup lang="ts">
import UnitsDropdown from "./UnitsDropdown.vue";
</script>

<template>
  <header class="flex justify-between px-16 py-8">
    <a @click.prevent href="/">
      <img src="/images/logo.svg" alt="Weather app logo" width="192" height="108" />
    </a>
    <UnitsDropdown />
  </header>
</template>
