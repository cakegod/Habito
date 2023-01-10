import { useStore } from "@nanostores/react";
import { habits, toggleModal } from "@stores/habits";
import type { HabitData } from "./home/ModalForm";

function calculateTime(
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

function calculateLiquid(
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

function AddedHabits() {
  const $habits = useStore(habits);
  return (
    <div className="absolute bottom-0 left-0 z-10 grid max-h-[20%] w-full grid-cols-2 gap-2 self-start overflow-auto bg-base-300 p-2 sm:grid-cols-3 md:grid-cols-6">
      {$habits.map((habit) => (
        <button
          className="btn-outline btn-info btn flex h-24 max-h-full grow flex-col gap-2 p-2 normal-case"
          onClick={() => toggleModal(habit)}
          key={habit.id}
        >
          <div className="flex">
            <span>{habit.icon}</span>
            <p>{habit.name}</p>
          </div>
          {typeof habit.time.value === "number" ? (
            <>
              <span className="badge badge-sm">
                {calculateTime(
                  habit.frequency.value,
                  habit.time.value,
                  habit.time.type
                )}
              </span>
              <span className="badge badge-sm">{`${habit.frequency.value} times / week`}</span>
            </>
          ) : (
            <span className="badge badge-sm">
              {calculateLiquid(Number(habit.liquid.value), habit.liquid.type)}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default AddedHabits;
