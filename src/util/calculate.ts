import { CONST, UNITS } from "./constants";

type Props = {
  frequency: string | number;
  dailyValue: string | number;
  unit: keyof typeof UNITS | number;
  year: number;
};

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type YearlyProps = Optional<Props, "frequency" | "unit">;

type DailyProps = Optional<Omit<Props, "year">, "frequency" | "unit">;

export function calculateDaily({
  frequency = CONST.DEFAULT_FREQUENCY,
  unit = CONST.DEFAULT_UNIT,
  dailyValue,
}: DailyProps) {
  const result =
    ((Number(frequency) * Number(dailyValue)) / CONST.DAYS_PER_WEEK) *
    (typeof unit === "string" ? UNITS[unit] : 1);
  return result;
}

export function calculateYearlyMinutes(args: YearlyProps) {
  return calculateDaily(args) * CONST.DAYS_PER_YEAR * args.year;
}

export function formatTimePerWeek(args: Omit<Props, "year">) {
  const minutes = calculateDaily(args) * CONST.DAYS_PER_WEEK;
  const hours = Math.round(minutes / CONST.MINUTES_PER_HOUR);
  return minutes >= CONST.MINUTES_PER_HOUR
    ? `${hours} hour${hours > 1 ? "s" : ""} / week`
    : `${minutes} min / week`;
}

export function formatTimePerYear(args: Props) {
  const hours = calculateYearlyMinutes(args) / CONST.MINUTES_PER_HOUR;
  return `${Math.round(hours)} hours`;
}

export function formatLiquidPerWeek(args: Pick<Props, "dailyValue" | "unit">) {
  const milliliters = calculateDaily(args) * CONST.DAYS_PER_WEEK;
  return milliliters >= 1000
    ? `${milliliters / CONST.ML_PER_LITER}L / week`
    : `${milliliters}mL / week`;
}

export function formatLiquidPerYear(args: Omit<Props, "frequency">) {
  const milliliters = calculateYearlyMinutes(args);
  return milliliters >= 1000
    ? `${Math.round((milliliters / CONST.ML_PER_LITER) * 10) / 10}L`
    : `${milliliters}mL`;
}

export function formatGenericPerYear(args: Pick<Props, "dailyValue" | "year">) {
  return calculateDaily(args) * CONST.DAYS_PER_YEAR * args.year;
}
