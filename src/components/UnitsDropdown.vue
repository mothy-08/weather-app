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
import { computed, ref } from "vue";
import DegreeSymbol from "./DegreeSymbol.vue";

type MeasurementSystem = "metric" | "imperial";

const previousMeasurementSystem = ref<MeasurementSystem>("imperial");
const currentMeasurementSystem = ref<MeasurementSystem>("metric");

function changeMeasurementSystem() {
  previousMeasurementSystem.value = currentMeasurementSystem.value;
  currentMeasurementSystem.value =
    currentMeasurementSystem.value === "metric" ? "imperial" : "metric";
}

const isMetricSystem = computed(() => currentMeasurementSystem.value === "metric");
const isImperialSystem = computed(() => currentMeasurementSystem.value === "imperial");
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button>
        <img src="/images/icon-units.svg" alt="Settings icon for dropdown" width="16" height="16" />
        Units
        <img
          src="/images/icon-dropdown.svg"
          alt="Chevron down icon for dropdown"
          width="16"
          height="16"
        />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuItem @click="changeMeasurementSystem">
        Switch to {{ previousMeasurementSystem }}
      </DropdownMenuItem>
      <DropdownMenuLabel>Temperature</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem
          :class="{ 'bg-accent': isMetricSystem }"
          class="flex items-center justify-between"
        >
          <span>Celsius (<DegreeSymbol /><abbr title="Celsius">C</abbr>)</span>
          <img
            src="/images/icon-checkmark.svg"
            alt="Checkmark icon for temperature in celsius"
            v-if="isMetricSystem"
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          :class="{ 'bg-accent': isImperialSystem }"
          class="flex items-center justify-between"
        >
          <span>Fahrenheit (<DegreeSymbol /><abbr title="Fahrenheit">F</abbr>)</span>
          <img
            src="/images/icon-checkmark.svg"
            alt="Checkmark icon for temperature in fahrenheit"
            v-if="isImperialSystem"
          />
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem
          :class="{ 'bg-accent': isMetricSystem }"
          class="flex items-center justify-between"
        >
          km/h
          <img
            src="/images/icon-checkmark.svg"
            alt="Checkmark icon for wind speed kilometer per hour"
            v-if="isMetricSystem"
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          :class="{ 'bg-accent': isImperialSystem }"
          class="flex items-center justify-between"
        >
          mph
          <img
            src="/images/icon-checkmark.svg"
            alt="Checkmark icon for wind speed in miles per hour"
            v-if="isImperialSystem"
          />
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuLabel>Precipitation</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem
          :class="{ 'bg-accent': isMetricSystem }"
          class="flex items-center justify-between"
        >
          Millimeters (mm)
          <img
            src="/images/icon-checkmark.svg"
            alt="Checkmark icon for precipitation in millimeters"
            v-if="isMetricSystem"
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          :class="{ 'bg-accent': isImperialSystem }"
          class="flex items-center justify-between"
        >
          Inches (in)
          <img
            src="/images/icon-checkmark.svg"
            alt="Checkmark icon for precipitation in inches"
            v-if="isImperialSystem"
          />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
