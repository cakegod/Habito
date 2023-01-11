import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";

interface Props {
  handleNext: (e: React.MouseEvent) => void;
}

export function SuccessButton({ handleNext }: Props) {
  const $habits = useStore(habits);
  return (
    <div className="mt-10 flex w-full justify-center">
      <button
        className="btn btn-success btn-lg"
        onClick={handleNext}
        disabled={!$habits.length}
      >
        Calculate my habits!
        <span className="m-1 text-xl">😎</span>
      </button>
    </div>
  );
}
