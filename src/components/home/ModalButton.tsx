import Button, { ButtonProps } from "@components/Button";

interface Props {
  intent: ButtonProps["intent"];
  forContent: string;
  children: React.ReactNode;
}

function ModalButton({ intent, forContent, children }: Props) {
  return (
    <Button intent={intent}>
      <label
        htmlFor={forContent}
        className="flex h-full w-full items-center justify-center"
      >
        {children}
      </label>
    </Button>
  );
}

export default ModalButton;
