import type { HabitData } from "@data/habits";
import type { Input } from "@data/inputs";
import { useStore } from "@nanostores/react";
import { habits, toggleModal } from "@stores/habits";
import {
  formatGenericPerYear,
  formatLiquidPerYear,
  formatTimePerYear,
} from "@util/calculate";
import { generateFunComparaison } from "@util/funComparaison";
import { transformToObj } from "@util/transform";

const gradients = [
  "bg-gradient-to-r from-sky-400 to-blue-500",
  "bg-gradient-to-r from-emerald-500 to-lime-600",
  "bg-gradient-to-r from-red-500 to-red-800",
  "bg-gradient-to-r from-orange-600 to-orange-500",
];

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

export function HabitCard({
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
      className={`card cursor-pointer gap-1 p-4 ${gradients[index % 4]} w-full`}
      onClick={() => toggleModal(habit)}
    >
      <Name name={habit.name} icon={habit.icon} />
      {
        <p className="text-xl font-bold text-base-300 md:text-2xl">
          {time && frequency && (
            <TimePerYear frequency={frequency} time={time} year={year} />
          )}
          {liquid && <LiquidPerYear liquid={liquid} year={year} />}
          {generic && <GenericPerYear generic={generic} year={year} />}
        </p>
      }
      <p className="text-start text-base-300">
        {generateFunComparaison(habit, inputs, year)}
      </p>
    </button>
  );
}

function Name({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="flex items-center gap-2 text-xl font-bold uppercase">
      <span>{icon}</span>
      <p className="text-sm text-base-300">{name}</p>
    </div>
  );
}

function TimePerYear({
  frequency,
  time,
  year,
}: {
  frequency: Input;
  time: Input;
  year: number;
}) {
  return (
    <>
      {formatTimePerYear({
        frequency: Number(frequency.selectedOption),
        dailyValue: Number(time.value),
        unit:
          time.selectedOption === "hours" || time.selectedOption === "minutes"
            ? time.selectedOption
            : "hours",
        year,
      })}
    </>
  );
}

function LiquidPerYear({ liquid, year }: { liquid: Input; year: number }) {
  return (
    <>
      {formatLiquidPerYear({
        dailyValue: Number(liquid.value),
        unit:
          liquid.selectedOption === "ml" || liquid.selectedOption === "l"
            ? liquid.selectedOption
            : "ml",
        year,
      })}
    </>
  );
}

function GenericPerYear({ generic, year }: { generic: Input; year: number }) {
  return (
    <>
      {`${formatGenericPerYear({
        dailyValue: Number(generic.value),
        year,
      })} ${generic.options[0] !== undefined && generic.options[0][1]}`}
    </>
  );
}
