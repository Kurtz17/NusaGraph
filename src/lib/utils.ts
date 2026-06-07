type ClassValue = string | number | boolean | null | undefined;

export function cn(...classes: Array<ClassValue | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(value?: number) {
  if (value === undefined) {
    return "Unknown";
  }

  return new Intl.NumberFormat("en-US").format(value);
}

export function formatCoordinate(value: number) {
  return value.toFixed(4);
}

export function uniqueValues(values: Array<string | undefined>) {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort();
}
