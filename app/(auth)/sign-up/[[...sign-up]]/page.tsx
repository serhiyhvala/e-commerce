"use client";

import { SignUp } from "@clerk/nextjs";
import useClerkTheme from "@/hooks/useClerkTheme";

export default function Page() {
  const { clerkVariables, clerkIcons } = useClerkTheme();
  return (
    <SignUp appearance={{ variables: clerkVariables, elements: clerkIcons }} />
  );
}
