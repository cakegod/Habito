import { useStore } from "@nanostores/react";
import { habits, toggleModal } from "@stores/habits";
import { calculateLiquid, calculateTime } from "src/util/calculate";

function AddedHabits() {
  const $habits = useStore(habits);
  return $habits.length > 0 ? (
    <div className="absolute bottom-0 left-0 z-10 grid max-h-[15%] w-full grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-2 self-start overflow-auto bg-base-300 p-2">
      {$habits.map((habit) => (
        <button
          className="btn flex h-24 max-h-full grow flex-col gap-1 p-2 normal-case"
          onClick={() => toggleModal(habit)}
          key={habit.id}
        >
          <div className="flex text-base">
            <span>{habit.icon}</span>
            <p>{habit.name}</p>
          </div>
          {habit.forms.includes("time") ? (
            <>
              <span className="badge-info badge-outline badge badge-sm ">
                {calculateTime(
                  habit.frequency.value,
                  Number(habit.time.value),
                  habit.time.type
                )}
              </span>
              <span className="badge-info badge-outline badge badge-sm ">{`${habit.frequency.value} times / week`}</span>
            </>
          ) : (
            <span className="badge-info badge-outline badge badge-sm ">
              {calculateLiquid(Number(habit.liquid.value), habit.liquid.type)}
            </span>
          )}
        </button>
      ))}
    </div>
  ) : null;
}

export default AddedHabits;
