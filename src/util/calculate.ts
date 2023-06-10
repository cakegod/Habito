import { CONST, UNITS } from "./constants";

export type CalculatorProps = {
  frequency?: string | number;
  dailyValue: string | number;
  unit?: keyof typeof UNITS | number;
  year?: number;
};

export class Calculator {
  #frequency;
  #dailyValue;
  #unitValue;
  #year;
  constructor({
    frequency = 1,
    dailyValue,
    unit = "generic",
    year = 1,
  }: CalculatorProps) {
    this.#frequency = Number(frequency);
    this.#dailyValue = Number(dailyValue);
    this.#unitValue = typeof unit === "string" ? UNITS[unit] : 1;
    this.#year = year;
  }

  get dailyMinutes() {
    const valuePerWeek = this.#frequency * this.#dailyValue * this.#unitValue;
    const valuePerDay = valuePerWeek / CONST.DAYS_PER_WEEK;
    return Math.floor(valuePerDay);
  }

  get weeklyMinutes() {
    return this.dailyMinutes * CONST.DAYS_PER_WEEK;
  }

  get yearlyMinutes() {
    return this.dailyMinutes * CONST.DAYS_PER_YEAR * this.#year;
  }

  get yearlyHours() {
    return Math.round(this.yearlyMinutes / CONST.MINUTES_PER_HOUR);
  }

  set year(value: number) {
    this.#year = value;
  }
}

export class Formatter {
  #calculator: Calculator;
  constructor(calculator: Calculator) {
    this.#calculator = calculator;
  }

  get hoursPerWeek() {
    const minutes = this.#calculator.dailyMinutes * CONST.DAYS_PER_WEEK;
    const hours = Math.round(minutes / CONST.MINUTES_PER_HOUR);
    return minutes >= CONST.MINUTES_PER_HOUR
      ? `${hours} hour${hours > 1 ? "s" : ""} / week`
      : `${minutes} min / week`;
  }

  get hoursPerYear() {
    const hours = this.#calculator.yearlyMinutes / CONST.MINUTES_PER_HOUR;
    return `${Math.round(hours)} hours`;
  }

  get liquidPerYear() {
    return this.#formatLiquidString(this.#calculator.yearlyMinutes);
  }

  get liquidPerWeek() {
    return this.#formatLiquidString(this.#calculator.weeklyMinutes);
  }

  #formatLiquidString(milliliters: number) {
    return milliliters >= 1000
      ? `${this.#toLiters(milliliters)}L`
      : `${milliliters}mL`;
  }

  #toLiters(milliliters: number) {
    return Math.round((milliliters / CONST.ML_PER_LITER) * 10) / 10;
  }
}

export function createFormatter(props: CalculatorProps) {
  return new Formatter(new Calculator(props));
}
