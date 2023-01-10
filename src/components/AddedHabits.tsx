import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";
import type { HabitData } from "./home/ModalForm";

function calculateTime(
  frequency: number,
  time: number,
  timeType: HabitData["time"]["type"]
) {
  const WEEK = 7;
  const durationPerDay = (frequency * time) / WEEK;

  switch (timeType) {
    case "minutes": {
      return durationPerDay < 60
        ? `${Math.ceil(durationPerDay)} minutes / day`
        : `${Math.ceil((durationPerDay / 60) * 10) / 10} hours / day`;
    }
    case "hours": {
      return `${Math.ceil(durationPerDay * 10) / 10} hours / day`;
    }
  }
}

function AddedHabits() {
  const $habits = useStore(habits);
  return (
    <div className="absolute bottom-0 left-0 z-10 grid max-h-[20%] w-full max-w-2xl grid-cols-2 gap-2 self-start overflow-auto bg-base-300 p-2 sm:grid-cols-3 md:grid-cols-4">
      {Object.values($habits).map((habit) => (
        <div className="btn-outline btn-info btn flex h-full grow flex-col gap-2 p-2 normal-case">
          <div className="flex">
            <span>{habit.icon}</span>
            <p>{habit.name}</p>
          </div>
          <span className="badge badge-sm">
            {calculateTime(
              habit.frequency.value,
              habit.time.value,
              habit.time.type
            )}
          </span>
          <span className="badge badge-sm">{`${habit.frequency.value} times / week`}</span>
        </div>
      ))}
    </div>
  );
}

export default AddedHabits;
