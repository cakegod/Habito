import type { HabitData } from "@components/home/ModalForm";

const WEEK = 7;

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
