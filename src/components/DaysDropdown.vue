<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { computed, ref } from "vue";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

type Weekday = (typeof WEEKDAYS)[number];

const props = defineProps<{
  currentDay: Weekday;
}>();

const currentDayChange = ref(props.currentDay);

const startIndex = computed(() => {
  const idx = WEEKDAYS.indexOf(props.currentDay);
  return idx === -1 ? 0 : idx;
});

const availableDays = [
  ...WEEKDAYS.slice(startIndex.value),
  ...WEEKDAYS.slice(0, startIndex.value),
];
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="flex items-center gap-2 text-base">
        {{ currentDayChange }}
        <img
          src="/images/icon-dropdown.svg"
          alt="Chevron down icon for dropdown"
          width="12"
          height="12"
        />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuItem
        :class="{ 'bg-neutral-600': day === currentDayChange }"
        class="justify-between"
        v-for="day in availableDays"
        :key="day"
        @click="currentDayChange = day"
      >
        {{ day }}
        <img
          src="/images/icon-checkmark.svg"
          alt="Checkmark icon for precipitation in inches"
          v-if="day === currentDayChange"
          width="12"
          height="12"
        />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
