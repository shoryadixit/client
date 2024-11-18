"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SidebarCloseIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export default function SideBar({ open, setOpenSideNav }) {
  const sidebarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSideNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      ref = { sidebarRef };
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`h-full z-10 flex absolute top-0 max-w-md w-full p-4 ${
        open ? "left-0" : "-left-full"
      } transition-all ease-in-out duration-500`}
    >
      <div className="ring-1 ring-slate-300 bg-muted w-full rounded-lg flex flex-col items-start justify-between font-bold text-3xl gap-8 px-4 relative">
        <Button
          variant="icon"
          className="absolute top-0 right-0"
          onClick={() => {
            setOpenSideNav(false);
          }}
        >
          <SidebarCloseIcon size={"30px"} />
        </Button>

        <div className="flex flex-col gap-8 h-full justify-center">
          <Link href="/" className="hover:text-muted-foreground cursor-pointer">
            Home
          </Link>
          <Link
            href="/product"
            className="hover:text-muted-foreground cursor-pointer"
          >
            Products
          </Link>
        </div>
        <div className="text-sm font-light p-4">
          © 2024 Car Store. All rights reserved.
        </div>
      </div>
    </div>
  );
}
