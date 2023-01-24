import type { HabitsNames, Habit } from "@data/habits";
import type { Input, InputNames } from "@data/inputs";
import { calculateYearly, CONST } from "@util/calculate";

type Props = {
  inputs: {
    [key in InputNames]: Input;
  };
  year: number;
  habitName: HabitsNames;
};

export function calculateRaindrops({ inputs, year }: Omit<Props, "habitName">) {
  const RAIN_DROPS_PER_ML = 20;
  const rainDropsQuantity =
    calculateYearly({
      frequency: 7,
      dailyValue: Number(inputs.liquid.value),
      unit: inputs.liquid.selectedOption,
      year,
    }) * RAIN_DROPS_PER_ML;

  return rainDropsQuantity > 1000000
    ? `Or ${Math.round((rainDropsQuantity / 1000000) * 10) / 10}M raindrops!`
    : `Or ${Math.round((rainDropsQuantity / 1000) * 10) / 10}K raindrops!`;
}

export function calculateBooks({ inputs, year, habitName }: Props) {
  const AVERAGE_MIN_PER_BOOK_READ = CONST.MINS_PER_HOUR * 15;
  const AVERAGE_MIN_PER_BOOK_WRITE =
    CONST.MINS_PER_HOUR * CONST.HOURS_PER_DAY * CONST.DAYS_PER_WEEK;
  const booksQuantity = Math.round(
    calculateYearly({
      frequency: Number(inputs.frequency.selectedOption),
      dailyValue: Number(inputs.time.value),
      unit: inputs.time.selectedOption,
      year,
    }) /
      (habitName === "Read"
        ? AVERAGE_MIN_PER_BOOK_READ
        : AVERAGE_MIN_PER_BOOK_WRITE)
  );
  return `Or ${booksQuantity} book${
    booksQuantity > 1 ? "s" : ""
  } read in ${year} year${year > 1 ? "s" : ""}!`;
}

export function calculateCigarettesPrice({
  inputs,
  year,
}: Omit<Props, "habitName">) {
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

export function calculateCodeLanguagesLearned({
  inputs,
  year,
}: Omit<Props, "habitName">) {
  const HOURS_TO_LEARN_LANGUAGE = 1440 * CONST.MINS_PER_HOUR;
  const languagesLearned = Math.floor(
    calculateYearly({
      frequency: Number(inputs.frequency.selectedOption),
      dailyValue: Number(inputs.time.value),
      unit: inputs.time.selectedOption,
      year,
    }) / HOURS_TO_LEARN_LANGUAGE
  );
  return `Or ${languagesLearned} code language${
    languagesLearned > 1 ? "s" : ""
  } learned!`;
}

export function generateFunComparaison(
  habit: Habit,
  inputs: { [key in InputNames]: Input },
  year: number
) {
  return FUN_CALC[habit.name]({
    inputs,
    year,
    habitName: habit.name,
  });
}

const FUN_CALC: {
  [key in HabitsNames]: ({
    inputs,
    year,
    habitName,
  }: {
    inputs: { [key in InputNames]: Input };
    year: number;
    habitName: HabitsNames;
  }) => string;
} = {
  Meditate: () => "Or a lot of stress reduced!",
  "Drink Water": calculateRaindrops,
  Code: calculateCodeLanguagesLearned,
  Exercise: () => "Or a lot of stress reduced",
  Read: calculateBooks,
  "Smartphone Addiction": () => "Or a lot of time saved!",
  "Smoke Addiction": calculateCigarettesPrice,
  Write: calculateBooks,
  "Learn Language": "", //
};
