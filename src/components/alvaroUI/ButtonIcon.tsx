import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function ButtonIcon({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="inline-flex items-center justify-center rounded-full h-10 w-10 border border-gold/50 bg-transparent text-gold hover:bg-gold/10 active:scale-95 transition-all"
    >
      {children}
    </button>
  );
}
