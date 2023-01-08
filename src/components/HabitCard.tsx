import { useStore } from "@nanostores/react";
import type { Habit } from "@data/habits";
import { addHabit, habits } from "@stores/habits";
import Modal from "./Modal";
import { useState } from "react";

interface Props {
  habit: Habit;
}

function HabitCard({ habit }: Props) {
  const $habits = useStore(habits);

  return (
    <>
      <label htmlFor={habit.name}>
        <div className="card flex h-24 items-center justify-center bg-base-300 p-4 transition-colors hover:bg-base-200">
          <span className="flex basis-full items-center text-lg">
            {habit?.icon}
          </span>
          <h2 className="flex basis-full items-start text-center">
            {habit?.name}
          </h2>
        </div>
      </label>
      <Modal habit={habit} />
    </>
  );
}
export default HabitCard;
