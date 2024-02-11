import { useTheme } from "next-themes";
import { Elements, Variables } from "@clerk/types";

const useClerkTheme = () => {
  const { theme } = useTheme();
  const clerkVariables: Variables = {
    colorBackground: theme === "dark" ? "#19191A" : "white",
    colorAlphaShade: theme === "dark" ? "white" : "black",
    colorText: theme === "dark" ? "white" : "black",
    colorInputText: theme === "dark" ? "white" : "black",
    colorInputBackground: theme === "dark" ? "#19191A" : "white",
  };
  const clerkIcons: Elements = {
    providerIcon__github: {
      filter: theme === "dark" ? "invert(1)" : "invert(0)",
    },
  };
  return { theme, clerkVariables, clerkIcons };
};

export default useClerkTheme;
