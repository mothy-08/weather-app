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
import { ref } from "vue";

type MeasurementSystem = "metric" | "imperial";

const previousMeasurementSystem = ref<MeasurementSystem>("imperial");
const currentMeasurementSystem = ref<MeasurementSystem>("metric");

function changeMeasurementSystem() {
  previousMeasurementSystem.value = currentMeasurementSystem.value;
  currentMeasurementSystem.value =
    currentMeasurementSystem.value === "metric" ? "imperial" : "metric";
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button>
        <img src="/images/icon-units.svg" alt="Settings icon for dropdown" />
        Units
        <img src="/images/icon-dropdown.svg" alt="Chevron down icon for dropdown" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuItem @click="changeMeasurementSystem">
        Switch to {{ previousMeasurementSystem }}</DropdownMenuItem
      >
      <DropdownMenuLabel>Temperature</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem disabled> Celsius (°C) </DropdownMenuItem>
        <DropdownMenuItem disabled> Fahrenheit (°F) </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem disabled>km/h</DropdownMenuItem>
        <DropdownMenuItem disabled>mph</DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem disabled>Millimeters (mm)</DropdownMenuItem>
        <DropdownMenuItem disabled>Inches (in)</DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
