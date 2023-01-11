import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

interface Props extends ButtonProps {
  children: React.ReactNode;
  handler?: () => void;
  type?: "button" | "submit";
}

export type ButtonProps = Required<VariantProps<typeof button>>;

const button = cva("btn", {
  variants: {
    intent: {
      primary: "btn-primary",
      ghost: "btn-ghost",
      success: "btn-success",
      info: "btn-info",
      warning: "btn-warning",
      error: "btn-error",
    },
    size: {
      large: "btn-lg",
      grow: "grow",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

function Button({ intent, size, children, type = "button", handler }: Props) {
  return (
    <button type={type} className={button({ intent, size })} onClick={handler}>
      {children}
    </button>
  );
}

export default Button;
