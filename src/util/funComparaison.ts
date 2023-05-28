import type { HabitsNames, Habit } from "@data/habits";
import type { InputNames, Inputs } from "@data/inputs";
import { calculateYearly } from "@util/calculate";
import { FUN } from "./constants";

type Props = {
  inputs: {
    [key in InputNames]: key extends keyof Inputs
      ? Inputs[key]
      : Inputs[Exclude<keyof Inputs, InputNames>];
  };
  year: number;
};

type HabitFunction = {
  [key in HabitsNames]: (
    yearValue: number,
    year: number,
    habitName: HabitsNames
  ) => string;
};

function calculateGenericYearlyValue({ inputs, year }: Props) {
  const { generic } = inputs;
  return calculateYearly({ year, dailyValue: generic.value });
}

function calculateTimeYearlyValue({ inputs, year }: Props) {
  const { frequency, time } = inputs;
  return calculateYearly({
    frequency: frequency.selectedOption,
    unit: time.selectedOption,
    year,
    dailyValue: time.value,
  });
}

function calculateLiquidYearlyValue({ inputs, year }: Props) {
  const { liquid } = inputs;

  return calculateYearly({
    dailyValue: liquid.value,
    unit: liquid.selectedOption,
    year,
  });
}

function calculateYearlyValue(data: Props): number {
  const {
    inputs: { liquid, time },
  } = data;

  if (liquid) {
    return calculateLiquidYearlyValue(data);
  } else if (time) {
    return calculateTimeYearlyValue(data);
  }

  return calculateGenericYearlyValue(data);
}

function drinkWater(yearlyValue: number) {
  const rainDropsQuantity = yearlyValue * FUN.RAIN_DROPS_PER_ML;

  return rainDropsQuantity > 1000000
    ? `Or ${Math.round((rainDropsQuantity / 1000000) * 10) / 10}M raindrops!`
    : `Or ${Math.round((rainDropsQuantity / 1000) * 10) / 10}K raindrops!`;
}

function books(yearlyValue: number, year: number, habitName: HabitsNames) {
  const booksQuantity =
    Math.round(yearlyValue) /
    (habitName === "Read"
      ? FUN.AVERAGE_MIN_PER_BOOK_READ
      : FUN.AVERAGE_MIN_PER_BOOK_WRITE);

  return `Or ${booksQuantity} book${
    booksQuantity > 1 ? "s" : ""
  } read in ${year} year${year > 1 ? "s" : ""}!`;
}

function smokeAddiction(yearlyValue: number) {
  const priceAnnually =
    Math.round(yearlyValue / FUN.CIGARETTES_PER_PACK) * FUN.PRICE_PER_PACK;
  return `Or $${priceAnnually} saved!`;
}

function code(yearlyValue: number) {
  const languagesLearned =
    Math.floor(yearlyValue) / FUN.HOURS_TO_LEARN_LANGUAGE;

  return `Or ${languagesLearned} code language${
    languagesLearned > 1 ? "s" : ""
  } learned!`;
}

function learnLanguage(yearlyValue: number) {
  const percentageAcquired = yearlyValue / FUN.MINS_WORKING_PROFICIENCY;
  const roundedPercentage = Math.round(percentageAcquired * 100);
  return `Or ${roundedPercentage}% the time required to reach professional working proficiency!`;
}

export function generateFunComparaison(
  habit: Habit,
  inputs: {
    [key in InputNames]: key extends keyof Inputs
      ? Inputs[key]
      : Inputs[Exclude<keyof Inputs, InputNames>];
  },
  year: number
) {
  const yearlyValue = calculateYearlyValue({ inputs, year });
  const habitFunc = habitFunctions[habit.name];
  return habitFunc(yearlyValue, year, habit.name);
}

const habitFunctions: HabitFunction = {
  Meditate: () => "Or a lot of stress reduced!",
  "Drink Water": drinkWater,
  Code: code,
  Exercise: () => "Or a lot of stress reduced",
  Read: books,
  Smartphone: () => "Or a lot of time saved!",
  Smoke: smokeAddiction,
  Write: books,
  "Learn Language": learnLanguage,
};
