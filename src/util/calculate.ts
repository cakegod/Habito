import type { HabitData, HabitsNames } from "@data/habits";
import type { Input } from "@data/inputs";

const MINS_PER_HOUR = 60;
// const HOURS_PER_DAY = 24;
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

function calculateWaterDrops(inputs: { liquid: Input }, year: number) {
  const rainDrops =
    calculateYearly({
      frequency: 7,
      dailyValue: Number(inputs.liquid.value),
      unit: inputs.liquid.selectedOption as "ml" | "l",
      year,
    }) * 20;
  return `Or ${
    rainDrops > 1000000 ? `${rainDrops / 1000000}M` : `${rainDrops / 1000}K`
  } rain drops.`;
}

export function generateFunComparaison(
  habit: HabitData,
  inputs: { [key: string]: Input },
  year: number
) {
  return FUN_CALC[habit.name as HabitsNames](inputs, year);
}

// TODO: change any type
const FUN_CALC: { [key in HabitsNames]: any } = {
  Meditate: "",
  "Drink Water": calculateWaterDrops,
  "Sleep Well": "",
  Code: "",
  Exercise: "",
  Read: "",
  Smartphone: "",
  Smoke: "",
  Write: "",
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

export function calculateYearly({ frequency, dailyValue, unit, year }: Props) {
  const result =
    ((frequency * dailyValue) / DAYS_PER_WEEK) *
    (typeof unit === "string" ? UNITS[unit] : 1);
  return result * DAYS_PER_YEAR * year;
}

export function formatTimePerWeek({
  frequency,
  dailyValue,
  unit,
}: Omit<Props, "year">) {
  const result =
    calculateDaily({ frequency, dailyValue, unit }) * DAYS_PER_WEEK;
  if (result >= 60) {
    const years = Math.round(result / MINS_PER_HOUR);
    return `${years} hour${years > 1 ? "s" : ""} / week`;
  }

  return `${result} min / week`;
}

export function formatTimePerYear({
  frequency,
  dailyValue,
  unit,
  year,
}: Props) {
  const result =
    calculateYearly({ frequency, dailyValue, unit, year }) / MINS_PER_HOUR;
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
  const result = calculateYearly({ frequency: 7, dailyValue, unit, year });
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
