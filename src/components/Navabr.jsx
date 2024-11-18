"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import SideBar from "./SideBar";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  const [openSideNav, setOpenSideNav] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="flex border items-center justify-between px-16 py-4">
      <Button
        variant="secondary"
        onClick={() => {
          setOpenSideNav(!openSideNav);
        }}
      >
        Menu
      </Button>
      <SideBar open={openSideNav} setOpenSideNav={setOpenSideNav} />
      <div>
        <Link href={"/"}>Car Shop</Link>
      </div>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              className="h-fit flex items-center justify-between gap-2"
            >
              <UserCircle size={29} />
              <p className="flex flex-col items-start justify-center tracking-tight leading-tight">
                <span className="text-xs font-medium leading-tight">
                  {isAuthenticated ? `${user?.name}` : "Guest"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isAuthenticated ? `${user?.email}` : "Guest@gmail.com"}
                </span>
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[150px]">
            <div className="flex flex-col gap-2 items-center justify-between w-full">
              {isAuthenticated ? (
                <>
                  {/* <Button variant="secondary" asChild className="w-full">
                    <Link href={"/account/123"}>My Cars</Link>
                  </Button> */}
                  <Button variant="secondary" asChild className="w-full">
                    <Link href={"/product/create"}>Add Cars</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" asChild className="w-full">
                    <Link href={"/login"}>Login</Link>
                  </Button>
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
