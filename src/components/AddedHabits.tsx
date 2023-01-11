import { useStore } from "@nanostores/react";
import { habits, toggleModal } from "@stores/habits";
import { calculateLiquidPerDay, composeHoursPerWeek } from "@util/calculate";

// TODO: Improve composition 
function AddedHabits() {
  const $habits = useStore(habits);
  return $habits.length > 0 ? (
    <div className="absolute bottom-0 left-0 z-10 grid max-h-[15%] w-full grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-2 self-start overflow-auto bg-base-300 p-2">
      {$habits.map((habit) => {
        const { id, icon, name, frequency, time, liquid, forms } = habit;
        return (
          <button
            className="btn flex h-24 max-h-full grow flex-col gap-1 p-2 normal-case"
            onClick={() => toggleModal(habit)}
            key={id}
          >
            <div className="flex text-base">
              <span>{icon}</span>
              <p>{name}</p>
            </div>
            {forms.includes("time") ? (
              <>
                <span className="badge-info badge badge-sm ">
                  {composeHoursPerWeek(
                    frequency.value,
                    Number(time.value),
                    time.type
                  )}
                </span>
                <span className="badge-info badge badge-sm ">{`${frequency.value} times per week`}</span>
              </>
            ) : (
              <>
                <span className="badge-info badge badge-sm ">
                  {`${calculateLiquidPerDay(
                    Number(liquid.value),
                    liquid.type
                  )}L per week`}
                </span>
                <span className="badge-info badge badge-sm ">daily</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  ) : null;
}

export default AddedHabits;
