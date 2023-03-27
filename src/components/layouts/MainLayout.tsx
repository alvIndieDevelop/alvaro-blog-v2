import { ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "../alvaroUI";
import Footer from "./Footer";

interface MainLayoutProp {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProp) {
  return (
    <>
      <Navbar>
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Alvaro Blog!</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/"}>Inicio</Link>
            </li>
            <li>
              <Link href={"/resumen"}>Resumen</Link>
            </li>
            <li>
              <Link href={"/blog"}>blog</Link>
            </li>
          </ul>
        </div>
      </Navbar>
      <main>{children}</main>
      <Footer />
    </>
  );
}
