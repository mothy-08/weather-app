<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUnits } from "@/composables/useUnits";
import DegreeSymbol from "./DegreeSymbol.vue";

const {
  tempUnit,
  speedUnit,
  precipUnit,
  isMetric,
  setMetric,
  setImperial,
  toggleTemp,
  toggleSpeed,
  togglePrecip,
} = useUnits();

function toggleSystem() {
  if (isMetric.value) {
    setImperial();
  } else {
    setMetric();
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="gap-2">
        <img
          src="/images/icon-units.svg"
          alt="Settings icon"
          width="16"
          height="16"
        />
        Units
        <img
          src="/images/icon-dropdown.svg"
          alt="Chevron down icon"
          width="12"
          height="12"
        />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      class="w-56 border-neutral-700 bg-neutral-900"
      align="end"
    >
      <DropdownMenuItem
        @click="toggleSystem"
        class="cursor-pointer focus:bg-neutral-800"
      >
        Switch to {{ isMetric ? "Imperial" : "Metric" }} System
      </DropdownMenuItem>

      <DropdownMenuSeparator class="bg-neutral-700" />

      <DropdownMenuLabel class="text-xs text-neutral-400">
        Temperature
      </DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem
          @click="toggleTemp"
          class="flex cursor-pointer items-center justify-between focus:bg-neutral-800"
        >
          <span>Celsius (<DegreeSymbol />C)</span>
          <img
            v-if="tempUnit === 'c'"
            src="/images/icon-checkmark.svg"
            alt="Selected"
            width="12"
            height="12"
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="toggleTemp"
          class="flex cursor-pointer items-center justify-between focus:bg-neutral-800"
        >
          <span>Fahrenheit (<DegreeSymbol />F)</span>
          <img
            v-if="tempUnit === 'f'"
            src="/images/icon-checkmark.svg"
            alt="Selected"
            width="12"
            height="12"
          />
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator class="bg-neutral-700" />

      <DropdownMenuLabel class="text-xs text-neutral-400">
        Wind Speed
      </DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem
          @click="toggleSpeed"
          class="flex cursor-pointer items-center justify-between focus:bg-neutral-800"
        >
          <span>km/h</span>
          <img
            v-if="speedUnit === 'kmh'"
            src="/images/icon-checkmark.svg"
            alt="Selected"
            width="12"
            height="12"
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="toggleSpeed"
          class="flex cursor-pointer items-center justify-between focus:bg-neutral-800"
        >
          <span>mph</span>
          <img
            v-if="speedUnit === 'mph'"
            src="/images/icon-checkmark.svg"
            alt="Selected"
            width="12"
            height="12"
          />
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator class="bg-neutral-700" />

      <DropdownMenuLabel class="text-xs text-neutral-400">
        Precipitation
      </DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem
          @click="togglePrecip"
          class="flex cursor-pointer items-center justify-between focus:bg-neutral-800"
        >
          <span>Millimeters (mm)</span>
          <img
            v-if="precipUnit === 'mm'"
            src="/images/icon-checkmark.svg"
            alt="Selected"
            width="12"
            height="12"
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          @click="togglePrecip"
          class="flex cursor-pointer items-center justify-between focus:bg-neutral-800"
        >
          <span>Inches (in)</span>
          <img
            v-if="precipUnit === 'in'"
            src="/images/icon-checkmark.svg"
            alt="Selected"
            width="12"
            height="12"
          />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
