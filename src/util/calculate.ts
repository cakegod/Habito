import { CONST, UNITS } from "./constants";

type Props = {
  frequency?: string | number;
  dailyValue: string | number;
  unit?: keyof typeof UNITS | number;
  year?: number;
};

export class Calculator {
  frequency;
  dailyValue;
  unit;
  year;
  constructor({
    frequency = 1,
    dailyValue,
    unit = "generic",
    year = 1,
  }: Props) {
    this.frequency = frequency;
    this.dailyValue = dailyValue;
    this.unit = unit;
    this.year = year;
  }

  get dailyMinutes() {
    const valuePerWeek = Number(this.frequency) * Number(this.dailyValue);
    const unitValue = typeof this.unit === "string" ? UNITS[this.unit] : 1;
    return Math.floor((valuePerWeek / CONST.DAYS_PER_WEEK) * unitValue);
  }

  get weeklyMinutes() {
    return this.dailyMinutes * CONST.DAYS_PER_WEEK;
  }

  get yearlyMinutes() {
    return this.dailyMinutes * CONST.DAYS_PER_YEAR * this.year;
  }

  get yearlyHours() {
    return Math.round(this.yearlyMinutes / CONST.MINUTES_PER_HOUR);
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
    return this.#processLiquidString(this.#calculator.yearlyMinutes);
  }

  get liquidPerWeek() {
    return this.#processLiquidString(this.#calculator.weeklyMinutes);
  }

  #processLiquidString(milliliters: number) {
    return milliliters >= 1000
      ? `${this.#toLiters(milliliters) / 10}L`
      : `${milliliters}mL`;
  }

  #toLiters(milliliters: number) {
    return Math.round((milliliters / CONST.ML_PER_LITER) * 10) / 10;
  }
}

export function createFormatter(props: Props) {
  return new Formatter(new Calculator(props));
}
