export function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

export function kmhToMph(k: number): number {
  return Math.round(k * 0.621371);
}

export function mmToInches(mm: number): number {
  const val = mm * 0.0393701;
  return val < 0.1 && val > 0
    ? Number(val.toFixed(2))
    : Math.round(val * 10) / 10;
}
