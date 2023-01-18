import type { HabitData } from "@data/habits";
import type { Input, InputNames } from "@data/inputs";
import { useStore } from "@nanostores/react";
import { habits, toggleModal } from "@stores/habits";
import {
  formatGenericPerYear,
  formatLiquidPerYear,
  formatTimePerYear,
  generateFunComparaison,
} from "@util/calculate";

const gradients = [
  "bg-gradient-to-r from-sky-400 to-blue-500",
  "bg-gradient-to-r from-emerald-500 to-lime-600",
  "bg-gradient-to-r from-red-500 to-red-800",
  "bg-gradient-to-r from-orange-600 to-orange-500",
];

function transformToObj(inputs: HabitData["inputs"]) {
  return inputs.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {} as { [key in InputNames]: Input });
}

export default function HabitsGrid({ year }: { year: number }) {
  const $habits = useStore(habits);
  return (
    <section className="grid w-full grid-cols-[repeat(2,_minmax(150px,_300px))] gap-2">
      {$habits.map((habit, index) => (
        <HabitCard key={habit.name} habit={habit} year={year} index={index} />
      ))}
    </section>
  );
}

function HabitCard({
  habit,
  year,
  index,
}: {
  habit: HabitData;
  year: number;
  index: number;
}) {
  const inputs = transformToObj(habit.inputs);
  const { time, frequency, liquid, generic } = inputs;
  return (
    <button
      className={`card cursor-pointer gap-1  p-4 ${gradients[index % 4]}`}
      onClick={() => toggleModal(habit)}
    >
      <Name name={habit.name} icon={habit.icon} />
      {
        <p className="text-xl font-bold text-primary-content md:text-2xl">
          {time &&
            frequency &&
            formatTimePerYear({
              frequency: Number(frequency.selectedOption),
              dailyValue: Number(time.value),
              unit: time.selectedOption as number,
              year,
            })}
          {liquid &&
            formatLiquidPerYear({
              dailyValue: Number(liquid.value),
              unit: liquid.selectedOption as "ml" | "l",
              year,
            })}
          {generic &&
            // TODO: To improve
            `${formatGenericPerYear({
              dailyValue: Number(generic.value),
              year,
            })} ${generic.options[0]![1]} ${habit.avoid ? "avoided" : ""}`}
        </p>
      }
      <p className="text-primary-content">
        {generateFunComparaison(habit, inputs, year)}
      </p>
    </button>
  );
}

function Name({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="flex items-center gap-2 font-bold text-xl uppercase">
      <span>{icon}</span>
      <p className="text-sm text-primary-content">{name}</p>
    </div>
  );
}
