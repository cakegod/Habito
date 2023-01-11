import type { HabitData } from "@components/home/ModalForm";

const HOUR = 60;
const WEEK = 7;
const DAYS_PER_YEAR = 365;

export function calculateMinutesPerDay(
  frequency: number,
  time: number,
  timeType: HabitData["time"]["type"]
) {
  const durationPerDay = (frequency * time) / WEEK;

  switch (timeType) {
    case "minutes": {
      return durationPerDay;
    }
    case "hours": {
      return durationPerDay * 60;
    }
  }
}

export function calculateHoursPerYear(
  frequency: number,
  time: number,
  timeType: HabitData["time"]["type"]
) {
  return (
    (calculateMinutesPerDay(frequency, time, timeType) * DAYS_PER_YEAR) / HOUR
  );
}

export function calculateLiquidPerDay(
  value: number,
  liquidType: HabitData["liquid"]["type"]
) {
  const LITER = 1000;
  const VOLUME = value * WEEK;

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
  timeType: HabitData["time"]["type"]
) {
  const minPerDay = calculateMinutesPerDay(frequency, time, timeType);
  const hoursPerWeek = Math.round(((minPerDay * 7) / 60) * 10) / 10;
  return `${hoursPerWeek} hours per week`;
}
