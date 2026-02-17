<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "./ui/button/Button.vue"; // Ensure this path matches your project structure
import type { DailyForecast } from "@/lib/types";
import { computed } from "vue";
import Checkmark from "@/assets/icons/icon-checkmark.svg";
import ChevronDown from "@/assets/icons/icon-dropdown.svg";

const props = defineProps<{
  items: DailyForecast[]; // Pass the actual API data here
  modelValue: string; // The currently selected date string (e.g., "2023-10-25")
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// Helper to display full weekday name (e.g., "Monday") from the ISO date
function getWeekdayName(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
}

// Compute the label for the trigger button
const selectedLabel = computed(() => {
  const found = props.items.find((i) => i.date === props.modelValue);
  return found ? getWeekdayName(found.date) : "Select Day";
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        class="flex cursor-pointer items-center gap-2 bg-neutral-600 text-sm hover:bg-neutral-600"
      >
        {{ selectedLabel }}

        <ChevronDown />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      class="text-neutral-0 w-56 border-neutral-600 bg-neutral-700"
      align="end"
    >
      <DropdownMenuItem
        v-for="item in items"
        :key="item.date"
        :class="{ 'bg-neutral-700': item.date === modelValue }"
        class="focus:text-neutral-0 flex cursor-pointer items-center justify-between focus:bg-neutral-600"
        @click="emit('update:modelValue', item.date)"
      >
        <span>{{ getWeekdayName(item.date) }}</span>

        <Checkmark v-if="item.date === modelValue" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
