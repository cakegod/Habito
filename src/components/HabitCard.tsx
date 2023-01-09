import { useStore } from "@nanostores/react";
import type { Habit } from "@data/habits";
import { habits, toggleModal } from "@stores/habits";
import Modal from "./Modal";

interface Props {
  habit: Habit;
}

function HabitCard({ habit }: Props) {
  const $habits = useStore(habits);

  return (
    <>
      <button
        className="card flex h-24 items-center justify-center bg-base-300 p-4 transition-colors hover:bg-base-200"
        onClick={toggleModal}
      >
        <span className="flex basis-full items-center text-lg">
          {habit.icon}
        </span>
        <h2 className="flex basis-full items-start text-center">
          {habit.name}
        </h2>
      </button>
      <Modal habit={habit} />
    </>
  );
}
export default HabitCard;
