function CloseButton({ forContent }: { forContent: string }) {
  return (
    <label
      htmlFor={forContent}
      className="btn-sm btn-circle btn absolute right-2 top-2 border-none bg-transparent text-lg"
    >
      ✕
    </label>
  );
}

export default CloseButton;
