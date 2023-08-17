'use client'

import {SignIn} from "@clerk/nextjs";
import useClerkTheme from "@/hooks/useClerkTheme";

export default function Page() {
    const {clerkVariables, clerkIcons} = useClerkTheme()

    return <SignIn appearance={{variables: clerkVariables, elements: clerkIcons}}/>;
}
