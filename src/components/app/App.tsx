import React, { useState } from "react";

import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";
import HabitsList from "./HabitsList";
import HabitsDrawer from "./HabitsDrawer";
import HabitsGrid from "./HabitsGrid";
import Modal from "@components/modal/Modal";

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
    const { value } = e.target;
    Number(value) === 0 ? setYear(1) : setYear(Number(value));
  }

  return (
    <Container>
      {index === 0 ? (
        <>
          <HabitsList />
          <CalculateButton handleNext={handleNext} />
          <HabitsDrawer />
        </>
      ) : (
        <>
          <Title handleYearChange={handleYearChange} year={year} />
          <HabitsGrid year={year} />
          <BackButton handleBack={handleBack} />
        </>
      )}
      <Modal />
    </Container>
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
      <button
        className="btn-info btn-lg btn text-center"
        onClick={handleBack}
        data-cy="btn-info"
      >
        <span className="mx-1 rotate-180">➤</span>
        Back to habit selection
      </button>
    </div>
  );
}

function CalculateButton({
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
        data-cy="btn-calculate"
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
