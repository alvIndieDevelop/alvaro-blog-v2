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
    <button {...rest} className="btn btn-circle">
      {children}
    </button>
  );
}
