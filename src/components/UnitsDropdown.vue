<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUnits } from "@/composables/useUnits";
import { computed } from "vue";
import UnitGroup from "./UnitGroup.vue";
import ChevronDown from "@/assets/icons/icon-dropdown.svg";
import UnitsIcon from "@/assets/icons/icon-units.svg";

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

const unitGroups = computed(() => {
  return [
    {
      label: "Temperature",
      metricDesc: "Celsius (°C)",
      metricActive: tempUnit.value === "c",
      imperialDesc: "Fahrenheit (°F)",
      imperialActive: tempUnit.value === "f",
      click: toggleTemp,
    },
    {
      label: "Wind Speed",
      metricDesc: "km/h",
      metricActive: speedUnit.value === "kmh",
      imperialDesc: "mph",
      imperialActive: speedUnit.value === "mph",
      click: toggleSpeed,
    },
    {
      label: "Precipitation",
      metricDesc: "Millimeters (mm)",
      metricActive: precipUnit.value === "mm",
      imperialDesc: "Inches (in)",
      imperialActive: precipUnit.value === "in",
      click: togglePrecip,
    },
  ];
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        class="flex cursor-pointer items-center gap-2 bg-neutral-600 text-sm hover:bg-neutral-600"
      >
        <UnitsIcon />
        Units
        <ChevronDown />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      class="text-neutral-0 w-56 border-neutral-600 bg-neutral-700"
      align="end"
    >
      <DropdownMenuItem
        @click="toggleSystem"
        class="focus:text-neutral-0 cursor-pointer focus:bg-neutral-600"
      >
        Switch to {{ isMetric ? "Imperial" : "Metric" }} System
      </DropdownMenuItem>

      <DropdownMenuSeparator class="bg-neutral-600" />

      <UnitGroup
        v-for="(unitGroup, i) in unitGroups"
        :key="unitGroup.label"
        @click="unitGroup.click"
        v-bind="unitGroup"
      >
        <DropdownMenuSeparator
          v-if="i != unitGroups.length - 1"
          class="bg-neutral-600"
        />
      </UnitGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
