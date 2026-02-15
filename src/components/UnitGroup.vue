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

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <DropdownMenuLabel class="text-xs text-neutral-400">
    {{ label }}
  </DropdownMenuLabel>

  <DropdownMenuGroup>
    <DropdownMenuItem
      @click="emit('click')"
      class="focus:text-neutral-0 flex cursor-pointer items-center justify-between focus:bg-neutral-600"
    >
      <span>{{ metricDesc }}</span>
      <img
        v-if="metricActive"
        src="/images/icon-checkmark.svg"
        alt="Selected"
        width="12"
        height="12"
      />
    </DropdownMenuItem>

    <DropdownMenuItem
      @click="emit('click')"
      class="focus:text-neutral-0 flex cursor-pointer items-center justify-between focus:bg-neutral-600"
    >
      <span>{{ imperialDesc }}</span>
      <img
        v-if="imperialActive"
        src="/images/icon-checkmark.svg"
        alt="Selected"
        width="12"
        height="12"
      />
    </DropdownMenuItem>
  </DropdownMenuGroup>

  <slot />
</template>
