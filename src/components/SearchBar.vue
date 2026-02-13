<script setup lang="ts">
import Button from "./ui/button/Button.vue";
import Input from "./ui/input/Input.vue";
</script>

<template>
  <form @submit.prevent action="" class="flex items-center gap-3">
    <div
      class="focus-within:outline-ring flex w-96 items-center gap-3 rounded-lg bg-neutral-800 px-4 py-2 outline"
    >
      <img
        src="/images/icon-search.svg"
        alt="Search icon"
        width="16"
        height="16"
      />
      <Input
        type="search"
        class="border-0 focus-visible:ring-0"
        placeholder="Search for a place..."
      />
    </div>

    <Button type="submit" class="cursor-pointer">Search</Button>
  </form>
</template>
