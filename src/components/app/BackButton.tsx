interface Props {
  handleBack: (e: React.MouseEvent) => void;
}

export function BackButton({ handleBack }: Props) {
  return (
    <div className="mt-10 flex w-full items-center justify-center">
      <button className="btn btn-info btn-lg text-center" onClick={handleBack}>
        <span className="mx-1 rotate-180">➤</span>
        Back to habit selection
      </button>
    </div>
  );
}
