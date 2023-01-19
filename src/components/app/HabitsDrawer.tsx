import type { HabitData } from "@data/habits";
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

function Habit({ habit }: { habit: HabitData }) {
  const { id, icon, name } = habit;
  const { time, frequency, liquid, generic } = transformToObj(habit.inputs);

  return (
    <button
      className="btn flex h-24 max-h-full grow flex-col gap-1 p-2 normal-case"
      onClick={() => toggleModal(habit)}
      key={id}
    >
      <Title icon={icon} name={name} />
      {time && frequency && (
        <>
          <Badge>
            {formatTimePerWeek({
              frequency: Number(frequency.selectedOption),
              dailyValue: Number(time.value),
              unit: time.selectedOption as number,
            })}
          </Badge>
          <Badge>{`${
            frequency.selectedOption === "7"
              ? "daily"
              : `${frequency.selectedOption} times / week`
          }`}</Badge>
        </>
      )}

      {liquid && (
        <>
          <Badge>
            {formatLiquidPerWeek({
              dailyValue: Number(liquid.value),
              unit: liquid.selectedOption as "ml" | "l",
            })}
          </Badge>
          <Badge>daily</Badge>
        </>
      )}

      {generic && (
        <>
          {/* Temporary */}
          <Badge>{`${Number(generic.value) * 7} ${
            generic.options[0]![1]
          } / week`}</Badge>
          <Badge>daily</Badge>
        </>
      )}
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
      <p>{name}</p>
    </div>
  );
}
