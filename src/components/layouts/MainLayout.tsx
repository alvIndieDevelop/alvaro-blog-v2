import React, { ReactNode, useRef, useState } from "react";
import Link from "next/link";
import { Navbar } from "../alvaroUI";
import Footer from "./Footer";

interface MainLayoutProp {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProp> = ({ children }) => {
  const handleOnClick = () => {
    const elem = document.activeElement as HTMLElement | null;
    if (elem) {
      elem?.blur();
    }
  };
  return (
    <>
      <Navbar>
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Alvaro Blog!</a>
        </div>
        <div className="block md:hidden">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <div className="w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/"} onClick={handleOnClick}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link href={"/resumen"} onClick={handleOnClick}>
                  Resumen
                </Link>
              </li>
              <li>
                <Link href={"/blog"} onClick={handleOnClick}>
                  blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden md:flex md:items-center">
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
        </div>
      </Navbar>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
