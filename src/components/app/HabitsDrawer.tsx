import type { Habit } from "@data/habits";
import type { Input, Inputs } from "@data/inputs";
import { useStore } from "@nanostores/react";
import { habits, toggleModal } from "@stores/habits";
import { formatLiquidPerWeek, formatTimePerWeek } from "@util/calculate";
import { transformToObj } from "@util/transform";
import type React from "react";

export default function HabitsDrawer() {
  const $habits = useStore(habits);
  return $habits.length > 0 ? (
    <Container>
      {$habits.map((habit) => (
        <Habit key={habit.name} habit={habit} />
      ))}
    </Container>
  ) : null;
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-0 left-0 z-10 grid max-h-[25%] w-full grid-cols-[repeat(auto-fill,_minmax(170px,_1fr))] gap-2 self-start overflow-auto bg-base-300 p-2">
      {children}
    </div>
  );
}

function Habit({ habit }: { habit: Habit }) {
  const { id, icon, name } = habit;
  const { time, frequency, liquid, generic } = transformToObj(habit.inputs);

  return (
    <button
      className="btn flex h-24 max-h-full grow flex-col gap-1 bg-base-100 p-2 normal-case hover:bg-base-300"
      onClick={() => toggleModal(habit)}
      key={id}
      data-cy={`${habit.name}-drawer-card`}
    >
      <Title icon={icon} name={name} />
      {time && frequency && <TimePerWeek frequency={frequency} time={time} />}
      {liquid && <LiquidPerWeek liquid={liquid} />}
      {generic && <GenericPerWeek generic={generic} />}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge-info badge badge-sm ">{children}</span>;
}

function Title({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="flex text-base">
      <span>{icon}</span>
      <p data-cy={`${name}-drawer-card-name`}>{name}</p>
    </div>
  );
}

function TimePerWeek({
  frequency,
  time,
}: {
  frequency: Inputs["frequency"];
  time: Inputs["time"];
}) {
  return (
    <>
      <Badge>
        {formatTimePerWeek({
          frequency: frequency.selectedOption,
          dailyValue: Number(time.value),
          unit: time.selectedOption,
        })}
      </Badge>
      <Badge>
        {frequency.selectedOption === "7"
          ? "daily"
          : `${frequency.selectedOption} times / week`}
      </Badge>
    </>
  );
}

function LiquidPerWeek({ liquid }: { liquid: Inputs["liquid"] }) {
  return (
    <>
      <Badge>
        {formatLiquidPerWeek({
          dailyValue: Number(liquid.value),
          unit: liquid.selectedOption,
        })}
      </Badge>
      <Badge>daily</Badge>
    </>
  );
}

function GenericPerWeek({ generic }: { generic: Input }) {
  return (
    <>
      {/* Temporary */}
      <Badge>{`${Number(generic.value) * 7} ${
        generic.options[0] !== undefined && generic.options[0][1]
      } / week`}</Badge>
      <Badge>daily</Badge>
    </>
  );
}
