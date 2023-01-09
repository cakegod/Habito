import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

interface Props extends ButtonProps {
  children: React.ReactNode;
	handler?: () => void;
  type?: "button" | "submit";
}

export type ButtonProps = Required<VariantProps<typeof button>>;

const button = cva("btn grow uppercase", {
  variants: {
    intent: {
      primary: "btn-primary",
      ghost: "btn-ghost",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

function Button({ intent, children, type = "button", handler }: Props) {
  return (
    <button type={type} className={button({ intent })} onClick={handler}>
      {children}
    </button>
  );
}

export default Button;
