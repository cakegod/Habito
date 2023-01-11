import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";
import { calculateHoursPerYear } from "@util/calculate";

interface Props {
  year: number;
}

const gradients = [
  "bg-gradient-to-r from-sky-400 to-blue-500",
  "bg-gradient-to-r from-emerald-500 to-lime-600",
  "bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500",
];

function pickGradient(index: number) {
  if (index % 3 === 0) {
    return `${gradients[2]} col-span-2`;
  } else if (index % 2 === 0) {
    return gradients[1];
  } else return gradients[0];
}

// TODO add logic for liquid and custom calculation (like drops of rain)
export function HabitsGridCards({ year }: Props) {
  const $habits = useStore(habits);
  return (
    <section className="grid w-full grid-cols-2 gap-2 ">
      {$habits.map((habit, i) => {
        const { frequency, time, icon, name } = habit;
        return (
          <div
            className={`card cursor-pointer gap-1 p-4 ${pickGradient(i + 1)}`}
          >
            <div className="flex items-center gap-2 font-bold uppercase">
              <span>{icon}</span>
              <p className="text-sm text-primary-content">{name}</p>
            </div>
            <p className="text-2xl font-bold text-primary-content">
              {`${
                Math.round(
                  calculateHoursPerYear(
                    frequency.value,
                    Number(time.value),
                    time.type
                  )
                ) * year
              } hours`}
            </p>
          </div>
        );
      })}
    </section>
  );
}
