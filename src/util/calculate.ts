import type { HabitData, HabitsNames } from "@data/habits";
import type { Input, InputNames } from "@data/inputs";

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

// FUN CALCS FUNCTIONS

function calculateRaindrops(inputs: { liquid: Input }, year: number) {
  const RAIN_DROPS_PER_ML = 20;
  const rainDropsQuantity =
    calculateYearly({
      frequency: 7,
      dailyValue: Number(inputs.liquid.value),
      unit: inputs.liquid.selectedOption as "ml" | "l",
      year,
    }) * RAIN_DROPS_PER_ML;

  return rainDropsQuantity > 1000000
    ? `Or ${rainDropsQuantity / 1000000}M raindrops!`
    : `Or ${rainDropsQuantity / 1000}K raindrops!`;
}

function calculateBooks(
  inputs: { time: Input; frequency: Input },
  year: number,
  habitName: string
) {
  const AVERAGE_MIN_PER_BOOK_READ = MINS_PER_HOUR * 15;
  const AVERAGE_MIN_PER_BOOK_WRITE =
    MINS_PER_HOUR * HOURS_PER_DAY * DAYS_PER_WEEK;
  const booksQuantity = Math.round(
    calculateYearly({
      frequency: Number(inputs.frequency.selectedOption),
      dailyValue: Number(inputs.time.value),
      unit: inputs.time.selectedOption as "minutes" | "hours",
      year,
    }) /
      (habitName === "Read"
        ? AVERAGE_MIN_PER_BOOK_READ
        : AVERAGE_MIN_PER_BOOK_WRITE)
  );
  return `Or ${booksQuantity} book${booksQuantity > 1 ? "s" : ""}!`;
}

function calculateCigarettesPrice(inputs: { generic: Input }, year: number) {
  const CIGARETTES_PER_PACK = 20;
  const PRICE_PER_PACK = 6.5;
  const priceAnnually = Math.round(
    (calculateYearly({
      frequency: 7,
      dailyValue: Number(inputs.generic.value),
      unit: "generic",
      year,
    }) /
      CIGARETTES_PER_PACK) *
      PRICE_PER_PACK
  );
  return `Or $${priceAnnually} saved!`;
}

export function generateFunComparaison(
  habit: HabitData,
  inputs: { [key in InputNames]: Input },
  year: number
) {
  return FUN_CALC[habit.name as HabitsNames](inputs, year, habit.name);
}

//////

// TODO: change any type
const FUN_CALC: {
  [key in HabitsNames]: (
    input: { [key in InputNames]: Input },
    year: number,
    habitName: string
  ) => string;
} = {
  Meditate: "",
  "Drink Water": calculateRaindrops,
  Code: "",
  Exercise: "",
  Read: calculateBooks,
  "Smartphone Addiction": "",
  "Smoke Addiction": calculateCigarettesPrice,
  Write: calculateBooks,
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
