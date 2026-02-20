<script setup lang="ts">
import {
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
defineProps<{
  label: string;
  metricDesc: string;
  metricActive: boolean;
  imperialDesc: string;
  imperialActive: boolean;
}>();
import Checkmark from "@/assets/icons/icon-checkmark.svg";

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <DropdownMenuLabel class="text-xs text-neutral-400">
    {{ label }}
  </DropdownMenuLabel>

  <DropdownMenuGroup class="space-y-1">
    <DropdownMenuItem
      @click="emit('click')"
      :class="{ 'bg-neutral-600': metricActive }"
      class="focus:text-neutral-0 flex cursor-pointer items-center justify-between focus:bg-neutral-600"
    >
      <span>{{ metricDesc }}</span>
      <Checkmark v-if="metricActive" />
    </DropdownMenuItem>

    <DropdownMenuItem
      @click="emit('click')"
      :class="{ 'bg-neutral-600': imperialActive }"
      class="focus:text-neutral-0 flex cursor-pointer items-center justify-between focus:bg-neutral-600"
    >
      <span>{{ imperialDesc }}</span>
      <Checkmark v-if="imperialActive" />
    </DropdownMenuItem>
  </DropdownMenuGroup>

  <slot />
</template>
