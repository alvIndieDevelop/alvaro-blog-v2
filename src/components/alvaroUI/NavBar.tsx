import React, { ReactNode } from "react";

interface IProp {
  children: ReactNode;
}

export default function Navbar({ children }: IProp) {
  return <div className="navbar bg-neutral">{children}</div>;
}
