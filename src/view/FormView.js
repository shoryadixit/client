"use client";

import Form from "@/components/Form";
import { usePathname } from "next/navigation";

export default function FormView() {
  const path = usePathname();
  return <Form isLoginForm={path === "/login"} />;
}
