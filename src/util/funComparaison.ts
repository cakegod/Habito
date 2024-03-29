import type { Habit } from "@data/habits";
import type { Input, InputNames } from "@data/inputs";
import { Calculator } from "@util/calculate";
import { FUN } from "./constants";

type Props = {
  inputs: {
    [key in InputNames]: Input;
  };
  years: number;
};

type HabitData = {
  yearlyValue: number;
  years: number;
};

// export function calculateGenericYearlyValue({ inputs, years }: Props) {
//   const { generic } = inputs;
//   return new Calculator({ years, dailyValue: generic.value }).yearlyHours;
// }

// export function calculateTimeYearlyValue({ inputs, years }: Props) {
//   const { frequency, time } = inputs;
//   return new Calculator({
//     frequency: frequency.selectedOption,
//     unit: time.selectedOption,
//     years,
//     dailyValue: time.value,
//   }).yearlyHours;
// }

// export function calculateLiquidYearlyValue({ inputs, years }: Props) {
//   const { liquid } = inputs;

//   return new Calculator({
//     dailyValue: liquid.value,
//     unit: liquid.selectedOption,
//     years,
//   }).yearlyHours;
// }

// export function calculateYearlyValue(args: Props): number {
//   const {
//     inputs: { liquid, time },
//   } = args;

//   if (liquid) {
//     return calculateLiquidYearlyValue(args);
//   } else if (time) {
//     return calculateTimeYearlyValue(args);
//   } else {
//     return calculateGenericYearlyValue(args);
//   }
// }

class YearlyValueCalculator {
  #inputs: { [key in InputNames]: Input };
  #years: number;

  constructor({ inputs, years }: Props) {
    this.#inputs = inputs;
    this.#years = years;
  }

  get calculate(): number {
    const { liquid, time } = this.#inputs;

    if (liquid) {
      return this.#liquidYearlyValue;
    } else if (time) {
      return this.#timeYearlyValue;
    } else {
      return this.#genericYearlyValue;
    }
  }

  get #genericYearlyValue(): number {
    const { generic } = this.#inputs;
    return new Calculator({ years: this.#years, dailyValue: generic.value })
      .yearlyHours;
  }

  get #timeYearlyValue(): number {
    const { frequency, time } = this.#inputs;
    return new Calculator({
      frequency: frequency.selectedOption,
      unit: time.selectedOption,
      years: this.#years,
      dailyValue: time.value,
    }).yearlyHours;
  }

  get #liquidYearlyValue(): number {
    const { liquid } = this.#inputs;
    return new Calculator({
      dailyValue: liquid.value,
      unit: liquid.selectedOption,
      years: this.#years,
    }).yearlyHours;
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

export function generateFunComparaison(data: {
  habit: Habit;
  inputs: {
    [key in InputNames]: Input;
  };
  years: number;
}) {
  const yearlyValue = new YearlyValueCalculator(data).calculate;
  const funComparaison = funComparaisons[
    data.habit.name as keyof typeof funComparaisons
  ]({ ...data, yearlyValue });

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
