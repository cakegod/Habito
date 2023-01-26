import type { Habit } from "@data/habits";
import type { Input, Inputs } from "@data/inputs";
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
  habit: Habit;
  year: number;
  index: number;
}) {
  const inputs = transformToObj(habit.inputs);
  const { time, frequency, liquid, generic } = inputs;
  return (
    <button
      className={`card cursor-pointer gap-1 p-4 ${gradients[index % 4]} w-full`}
      onClick={() => toggleModal(habit)}
      data-cy={`${habit.name}-grid-card`}
    >
      <Name name={habit.name} icon={habit.icon} />
      {
        <p
          className="text-3xl font-bold text-base-300"
          data-cy={`${habit.name}-grid-card-value`}
        >
          {time && frequency && (
            <TimePerYear frequency={frequency} time={time} year={year} />
          )}
          {liquid && <LiquidPerYear liquid={liquid} year={year} />}
          {generic && <GenericPerYear generic={generic} year={year} />}
        </p>
      }
      <p
        className="text-start text-sm text-base-300"
        data-cy={`${habit.name}-grid-card-fun`}
      >
        {generateFunComparaison(habit, inputs, year)}
      </p>
    </button>
  );
}

function Name({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="flex items-center gap-2 text-xl font-bold uppercase">
      <span className="text-base">{icon}</span>
      <p
        className="text-sm text-base-300/80"
        data-cy={`${name}-grid-card-name`}
      >
        {name}
      </p>
    </div>
  );
}

function TimePerYear({
  frequency,
  time,
  year,
}: {
  frequency: Inputs["frequency"];
  time: Inputs["time"];
  year: number;
}) {
  return (
    <>
      {formatTimePerYear({
        frequency: frequency.selectedOption,
        dailyValue: Number(time.value),
        unit: time.selectedOption,
        year,
      })}
    </>
  );
}

function LiquidPerYear({
  liquid,
  year,
}: {
  liquid: Inputs["liquid"];
  year: number;
}) {
  return (
    <>
      {formatLiquidPerYear({
        dailyValue: Number(liquid.value),
        unit: liquid.selectedOption,
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
