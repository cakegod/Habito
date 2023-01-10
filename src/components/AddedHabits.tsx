import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";
import React from "react";

function AddedHabits() {
  const $habits = useStore(habits);
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-2 self-start sm:grid-cols-3 md:grid-cols-4">
      {Object.values($habits).map((habit) => (
        <div className="btn-outline btn-info btn flex h-full grow flex-col gap-2 p-2 normal-case">
          <div className="flex">
            <span>{habit.icon}</span>
            <p>{habit.name}</p>
          </div>
          <span className="badge badge-sm">{`${Math.ceil(
            (habit.frequency.value * habit.time.value) / 7
          )} minutes per day`}</span>
          <span className="badge badge-sm">{`${habit.frequency.value} times per week`}</span>
        </div>
      ))}
    </div>
  );
}

export default AddedHabits;
