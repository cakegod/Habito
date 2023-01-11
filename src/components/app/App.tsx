import React, { useState } from "react";
import AddedHabits from "@components/AddedHabits";
import { BackButton } from "@components/app/BackButton";
import { HabitsGridCards } from "@components/app/HabitsGridCards";
import { SuccessButton } from "@components/app/SuccessButton";
import { YearTitleInput } from "@components/app/YearTitleInput";
import HabitsList from "@components/home/HabitsList";

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
          <Wrapper>
            <HabitsList />
            <SuccessButton handleNext={handleNext} />
          </Wrapper>
          <AddedHabits />
        </>
      ) : (
        <Wrapper>
          <YearTitleInput handleYearChange={handleYearChange} year={year} />
          <HabitsGridCards year={year} />
          <BackButton handleBack={handleBack} />
        </Wrapper>
      )}
    </>
  );
}

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-xl grow">
      <main className="flex w-full max-w-3xl flex-col items-center">
        {children}
      </main>
    </div>
  );
}

export default App;
