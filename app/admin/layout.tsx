import { FC, ReactNode } from "react";
import AdminHeader from "@/components/AdminHeader";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import Loading from "@/components/Loading";
import {currentUser} from "@clerk/nextjs/server";

const AuthLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="p-3">
      <AdminHeader />
      {children}
    </div>
  );
};

export default AuthLayout;
