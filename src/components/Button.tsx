import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

interface Props extends ButtonProps {
  children: React.ReactNode;
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

function Button({ intent, children }: Props) {
  return (
    <button type="submit" className={button({ intent })}>
      {children}
    </button>
  );
}

export default Button;
