interface Props {
  frequency: number;
  dailyValue: number;
  unit: keyof typeof UNITS | number;
  year: number;
}

export const CONST = {
  MINS_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  DAYS_PER_WEEK: 7,
  DAYS_PER_YEAR: 365,
  ML_PER_LITER: 1000,
};

export const UNITS = {
  minutes: 1,
  hours: 60,
  ml: 1,
  l: 1000,
  generic: 1,
};

export function calculateDaily({
  frequency,
  dailyValue,
  unit,
}: Omit<Props, "year">) {
  const result =
    ((frequency * dailyValue) / CONST.DAYS_PER_WEEK) *
    (typeof unit === "string" ? UNITS[unit] : 1);
  return result;
}

export function calculateYearly({ frequency, dailyValue, unit, year }: Props) {
  const result =
    ((frequency * dailyValue) / CONST.DAYS_PER_WEEK) *
    (typeof unit === "string" ? UNITS[unit] : 1);
  return result * CONST.DAYS_PER_YEAR * year;
}

export function formatTimePerWeek({
  frequency,
  dailyValue,
  unit,
}: Omit<Props, "year">) {
  const result =
    calculateDaily({ frequency, dailyValue, unit }) * CONST.DAYS_PER_WEEK;
  if (result >= 60) {
    const years = Math.round(result / CONST.MINS_PER_HOUR);
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
    calculateYearly({ frequency, dailyValue, unit, year }) /
    CONST.MINS_PER_HOUR;
  return `${Math.round(result)} hours`;
}

export function formatLiquidPerWeek({
  dailyValue,
  unit,
}: Pick<Props, "dailyValue" | "unit">) {
  const result =
    calculateDaily({ frequency: 7, dailyValue, unit }) * CONST.DAYS_PER_WEEK;
  return result >= 1000
    ? `${result / CONST.ML_PER_LITER}L / week`
    : `${result}mL / week`;
}

export function formatLiquidPerYear({
  dailyValue,
  unit,
  year,
}: Omit<Props, "frequency">) {
  const result = calculateYearly({ frequency: 7, dailyValue, unit, year });
  return result >= 1000 ? `${Math.round(result / CONST.ML_PER_LITER * 10) / 10}L` : `${result}mL`;
}

export function formatGenericPerYear({
  dailyValue,
  year,
}: Pick<Props, "dailyValue" | "year">) {
  const result =
    calculateDaily({ frequency: 7, dailyValue, unit: "generic" }) *
    CONST.DAYS_PER_YEAR *
    year;

  return result;
}
