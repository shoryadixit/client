"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function SubmitButton({ children, variant, className, loading }) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={className}
      type="submit"
      disabled={loading }
      variant={variant}
    >
      {children}
    </Button>
  );
}
