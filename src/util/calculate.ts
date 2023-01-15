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

export function calculateDaily(
  frequency: number,
  dailyValue: number,
  unit: keyof typeof UNITS
) {
  const result = ((frequency * dailyValue) / DAYS_PER_WEEK) * UNITS[unit];
  return result;
}

export function formatTimePerWeek(
  frequency: number,
  dailyValue: number,
  unit: keyof typeof UNITS
) {
  const result =
    Math.round(
      calculateDaily(frequency, dailyValue, unit) * DAYS_PER_WEEK * 10
    ) / 10;
  return result >= 60
    ? `${result / MINS_PER_HOUR} hours / week`
    : `${result} min / week`;
}

export function formatTimePerYear(
  frequency: number,
  dailyValue: number,
  unit: keyof typeof UNITS,
  year: number
) {
  const result =
    (calculateDaily(frequency, dailyValue, unit) * DAYS_PER_YEAR * year) /
    MINS_PER_HOUR;
  return `${Math.round(result)} hours`;
}

export function formatLiquidPerWeek(
  dailyValue: number,
  unit: keyof typeof UNITS
) {
  const result = calculateDaily(7, dailyValue, unit) * DAYS_PER_WEEK;
  return result >= 1000
    ? `${result / ML_PER_LITER}L / week`
    : `${result}mL / week`;
}

export function formatLiquidPerYear(
  dailyValue: number,
  unit: keyof typeof UNITS,
  year: number
) {
  const result = calculateDaily(7, dailyValue, unit) * DAYS_PER_YEAR * year;
  return result >= 1000 ? `${result / ML_PER_LITER}L` : `${result}mL`;
}

export function formatGenericPerYear(dailyValue: number, year: number) {
  const result =
    calculateDaily(7, dailyValue, "generic") * DAYS_PER_YEAR * year;

  return result;
}
