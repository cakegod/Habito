import type { HabitData } from "@components/modal/ModalForm";

const MINS_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_WEEK = 7;
const DAYS_PER_YEAR = 365;

export function calculateMinutesPerDay(
  frequency: number,
  time: number,
  timeType: HabitData["time"]["unit"]
) {
  const durationPerDay = (frequency * time) / DAYS_PER_WEEK;

  switch (timeType) {
    case "minutes": {
      return durationPerDay;
    }
    case "hours": {
      return durationPerDay * 60;
    }
  }
}

export function composeTimePerYear(
  frequency: number,
  time: number,
  timeType: HabitData["time"]["unit"],
  year: number
) {
  const hoursPerYear =
    ((calculateMinutesPerDay(frequency, time, timeType) * DAYS_PER_YEAR) /
      MINS_PER_HOUR) *
    year;
  if (hoursPerYear >= HOURS_PER_DAY) {
    return `${Math.round(hoursPerYear / HOURS_PER_DAY)} day${
      hoursPerYear > 1 ? "s" : ""
    }`;
  }
  return `${Math.round(hoursPerYear * 10) / 10} hours`;
}

export function calculateLiquidPerDay(
  value: number,
  liquidType: HabitData["liquid"]["unit"]
) {
  const LITER = 1000;
  const VOLUME = value * DAYS_PER_WEEK;

  switch (liquidType) {
    case "ml": {
      return VOLUME / LITER;
    }
    case "l": {
      return VOLUME;
    }
  }
}

export function composeHoursPerWeek(
  frequency: number,
  time: number,
  timeType: HabitData["time"]["unit"]
) {
  const minPerDay = calculateMinutesPerDay(frequency, time, timeType);
  const hoursPerWeek = Math.round(((minPerDay * 7) / 60) * 10) / 10;
  return `${hoursPerWeek} hours per week`;
}
