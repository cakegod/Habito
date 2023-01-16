const MINS_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_WEEK = 7;
const DAYS_PER_YEAR = 365;
const ML_PER_LITER = 1000;

const UNITS = {
  minutes: 1,
  hours: 60,
  ml: 1,
  l: 1000,
  generic: 1,
};

interface Props {
  frequency: number;
  dailyValue: number;
  unit: keyof typeof UNITS | number;
  year: number;
}

export function calculateDaily({
  frequency,
  dailyValue,
  unit,
}: Omit<Props, "year">) {
  const result =
    ((frequency * dailyValue) / DAYS_PER_WEEK) *
    (typeof unit === "string" ? UNITS[unit] : 1);
  return result;
}

export function formatTimePerWeek({
  frequency,
  dailyValue,
  unit,
}: Omit<Props, "year">) {
  console.log(frequency, dailyValue, unit);

  const result =
    calculateDaily({ frequency, dailyValue, unit }) * DAYS_PER_WEEK;
  return result >= 60
    ? `${Math.round(result / MINS_PER_HOUR)} hours / week`
    : `${result} min / week`;
}

export function formatTimePerYear({
  frequency,
  dailyValue,
  unit,
  year,
}: Props) {
  const result =
    (calculateDaily({ frequency, dailyValue, unit }) * DAYS_PER_YEAR * year) /
    MINS_PER_HOUR;
  return `${Math.round(result)} hours`;
}

export function formatLiquidPerWeek({
  dailyValue,
  unit,
}: Pick<Props, "dailyValue" | "unit">) {
  const result =
    calculateDaily({ frequency: 7, dailyValue, unit }) * DAYS_PER_WEEK;
  return result >= 1000
    ? `${result / ML_PER_LITER}L / week`
    : `${result}mL / week`;
}

export function formatLiquidPerYear({
  dailyValue,
  unit,
  year,
}: Omit<Props, "frequency">) {
  const result =
    calculateDaily({ frequency: 7, dailyValue, unit }) * DAYS_PER_YEAR * year;
  return result >= 1000 ? `${result / ML_PER_LITER}L` : `${result}mL`;
}

export function formatGenericPerYear({
  dailyValue,
  year,
}: Pick<Props, "dailyValue" | "year">) {
  const result =
    calculateDaily({ frequency: 7, dailyValue, unit: "generic" }) *
    DAYS_PER_YEAR *
    year;

  return result;
}
