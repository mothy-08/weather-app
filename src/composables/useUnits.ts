import { ref, computed } from "vue";

const tempUnit = ref<"c" | "f">("c");
const speedUnit = ref<"kmh" | "mph">("kmh");
const precipUnit = ref<"mm" | "in">("mm");

export function useUnits() {
  const isMetric = computed(
    () =>
      tempUnit.value === "c" &&
      speedUnit.value === "kmh" &&
      precipUnit.value === "mm",
  );

  function setMetric() {
    tempUnit.value = "c";
    speedUnit.value = "kmh";
    precipUnit.value = "mm";
  }

  function setImperial() {
    tempUnit.value = "f";
    speedUnit.value = "mph";
    precipUnit.value = "in";
  }

  function toggleTemp() {
    tempUnit.value = tempUnit.value === "c" ? "f" : "c";
  }

  function toggleSpeed() {
    speedUnit.value = speedUnit.value === "kmh" ? "mph" : "kmh";
  }

  function togglePrecip() {
    precipUnit.value = precipUnit.value === "mm" ? "in" : "mm";
  }

  return {
    tempUnit,
    speedUnit,
    precipUnit,
    isMetric,
    setMetric,
    setImperial,
    toggleTemp,
    toggleSpeed,
    togglePrecip,
  };
}
