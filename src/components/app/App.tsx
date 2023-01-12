import React, { useState } from "react";

import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";
import HabitsList from "./HabitsList";
import HabitsDrawer from "./HabitsDrawer";
import HabitsGrid from "./HabitsGrid";

function App() {
  const [index, setIndex] = useState<0 | 1>(0);
  const [year, setYear] = useState<number>(1);

  function handleNext() {
    setIndex(1);
  }

  function handleBack() {
    setIndex(0);
  }

  function handleYearChange(e: React.ChangeEvent<HTMLInputElement>) {
    setYear(Number(e.target.value));
  }

  return (
    <>
      {index === 0 ? (
        <>
          <Container>
            <HabitsList />
            <SuccessButton handleNext={handleNext} />
          </Container>
          <HabitsDrawer />
        </>
      ) : (
        <Container>
          <Title handleYearChange={handleYearChange} year={year} />
          <HabitsGrid year={year} />
          <BackButton handleBack={handleBack} />
        </Container>
      )}
    </>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-xl grow">
      <main className="flex w-full max-w-3xl flex-col items-center">
        {children}
      </main>
    </div>
  );
}

function BackButton({
  handleBack,
}: {
  handleBack: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="mt-10 flex w-full items-center justify-center">
      <button className="btn-info btn-lg btn text-center" onClick={handleBack}>
        <span className="mx-1 rotate-180">➤</span>
        Back to habit selection
      </button>
    </div>
  );
}

function SuccessButton({
  handleNext,
}: {
  handleNext: (e: React.MouseEvent) => void;
}) {
  const $habits = useStore(habits);
  return (
    <div className="mt-10 flex w-full justify-center">
      <button
        className="btn-success btn-lg btn"
        onClick={handleNext}
        disabled={!$habits.length}
      >
        Calculate my habits!
        <span className="m-1 text-xl">😎</span>
      </button>
    </div>
  );
}

function Title({
  handleYearChange,
  year,
}: {
  handleYearChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  year: number;
}) {
  return (
    <h2 className="mb-4 flex items-center self-start text-lg">
      In
      <input
        type="number"
        onChange={handleYearChange}
        min={1}
        max={99}
        value={year}
        className="input mx-2 w-20 bg-neutral text-center font-bold"
      />
      year{year > 1 && "s"}, you will achieve:
    </h2>
  );
}

export default App;
