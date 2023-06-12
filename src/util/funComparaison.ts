import type { Habit } from "@data/habits";
import type { Input, InputNames } from "@data/inputs";
import { Calculator } from "@util/calculate";
import { FUN } from "./constants";

type Props = {
  inputs: {
    [key in InputNames]: Input;
  };
  year: number;
};

type HabitData = {
  yearlyValue: number;
  years: number;
};

export function calculateGenericYearlyValue({ inputs, year }: Props) {
  const { generic } = inputs;
  return new Calculator({ year, dailyValue: generic.value }).yearlyHours;
}

export function calculateTimeYearlyValue({ inputs, year }: Props) {
  const { frequency, time } = inputs;
  return new Calculator({
    frequency: frequency.selectedOption,
    unit: time.selectedOption,
    year,
    dailyValue: time.value,
  }).yearlyHours;
}

export function calculateLiquidYearlyValue({ inputs, year }: Props) {
  const { liquid } = inputs;

  return new Calculator({
    dailyValue: liquid.value,
    unit: liquid.selectedOption,
    year,
  }).yearlyHours;
}

export function calculateYearlyValue(args: Props): number {
  const {
    inputs: { liquid, time },
  } = args;

  if (liquid) {
    return calculateLiquidYearlyValue(args);
  } else if (time) {
    return calculateTimeYearlyValue(args);
  } else {
    return calculateGenericYearlyValue(args);
  }
}

class FunComparaison {
  yearlyValue: number;
  years: number;

  constructor(data: HabitData) {
    this.yearlyValue = data.yearlyValue;
    this.years = data.years;
  }
}

class Meditate extends FunComparaison {
  get value() {
    return "Or a lot of stress reduced!";
  }
}

class DrinkWater extends FunComparaison {
  get value() {
    const rainDropsQuantity = this.yearlyValue * FUN.RAIN_DROPS_PER_ML;

    return rainDropsQuantity > 1000000
      ? `Or ${Math.round((rainDropsQuantity / 1000000) * 10) / 10}M raindrops!`
      : `Or ${Math.round((rainDropsQuantity / 1000) * 10) / 10}K raindrops!`;
  }
}

class Code extends FunComparaison {
  get value() {
    const languagesLearned =
      Math.round((this.yearlyValue / FUN.MINUTES_TO_LEARN_LANGUAGE) * 10) / 10;
    return `Or ${languagesLearned} programming language${
      languagesLearned > 1 ? "s" : ""
    } mastered!`;
  }
}

class Exercise extends FunComparaison {
  get value() {
    return "Or a lot of stress reduced";
  }
}

class Read extends FunComparaison {
  get value() {
    const booksQuantity = Math.round(
      this.yearlyValue / FUN.AVERAGE_MIN_PER_BOOK_READ
    );

    return `Or ${booksQuantity} book${booksQuantity > 1 ? "s" : ""} read in ${
      this.years
    } year${this.years > 1 ? "s" : ""}!`;
  }
}

class Smartphone extends FunComparaison {
  get value() {
    return "Or a lot of time saved!";
  }
}

class Smoke extends FunComparaison {
  get value() {
    const priceAnnually =
      Math.round(this.yearlyValue / FUN.CIGARETTES_PER_PACK) *
      FUN.PRICE_PER_PACK;
    return `Or $${priceAnnually} saved!`;
  }
}

class Write extends FunComparaison {
  get value() {
    const booksQuantity = Math.round(
      this.yearlyValue / FUN.AVERAGE_MIN_PER_BOOK_WRITE
    );

    return `Or ${booksQuantity} book${booksQuantity > 1 ? "s" : ""} read in ${
      this.years
    } year${this.years > 1 ? "s" : ""}!`;
  }
}

class LearnLanguage extends FunComparaison {
  get value() {
    const percentageAcquired = this.yearlyValue / FUN.MINS_WORKING_PROFICIENCY;
    const roundedPercentage = Math.round(percentageAcquired * 100);
    return `Or ${roundedPercentage}% the time required to reach professional working proficiency!`;
  }
}

export function generateFunComparaison(
  habit: Habit,
  inputs: {
    [key in InputNames]: Input;
  },
  year: number
) {
  const yearlyValue = calculateYearlyValue({
    inputs,
    year,
  });
  const funComparaison = funComparaisons[
    habit.name as keyof typeof funComparaisons
  ]({ yearlyValue, years: year });

  if (!funComparaison) throw new Error("Habit");

  return funComparaison.value;
}

export const funComparaisons = {
  Meditate: (data: HabitData) => new Meditate(data),
  "Drink Water": (data: HabitData) => new DrinkWater(data),
  Code: (data: HabitData) => new Code(data),
  Exercise: (data: HabitData) => new Exercise(data),
  Read: (data: HabitData) => new Read(data),
  Smartphone: (data: HabitData) => new Smartphone(data),
  Smoke: (data: HabitData) => new Smoke(data),
  Write: (data: HabitData) => new Write(data),
  "Learn Language": (data: HabitData) => new LearnLanguage(data),
};
