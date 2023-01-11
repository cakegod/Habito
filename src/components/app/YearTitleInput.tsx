interface Props {
  handleYearChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  year: number;
}

export function YearTitleInput({ handleYearChange, year }: Props) {
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
