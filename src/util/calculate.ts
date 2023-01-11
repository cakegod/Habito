import type { HabitData } from "@components/home/ModalForm";

export function calculateTime(
  frequency: number,
  time: number,
  timeType: HabitData["time"]["type"]
) {
  const WEEK = 7;
  const durationPerDay = Math.ceil((frequency * time) / WEEK);

  switch (timeType) {
    case "minutes": {
      return durationPerDay < 60
        ? `${durationPerDay} minutes / day`
        : `${((durationPerDay / 60) * 10) / 10} hours / day`;
    }
    case "hours": {
      return `${(durationPerDay * 10) / 10} hours / day`;
    }
  }
}

export function calculateLiquid(
  value: number,
  liquidType: HabitData["liquid"]["type"]
) {
  const LITER = 1000;
  const WEEK = 7;
  const VOLUME = value * WEEK;

  switch (liquidType) {
    case "ml": {
      return VOLUME < 1000
        ? `${VOLUME}ml / week`
        : `${(VOLUME * WEEK) / LITER}L / week`;
    }
    case "l": {
      return `${VOLUME}L / week`;
    }
  }
}