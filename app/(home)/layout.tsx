'use client'

import {FC, ReactNode, useEffect} from "react";
import UserHeader from "@/components/UserHeader";
import Footer from "@/components/Footer";
import {useStore} from "@/store/store";
import {useSearchParams} from "next/navigation";

const UserLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const {removeAll} = useStore();
    const searchParams = useSearchParams();
    const paymentStatus = searchParams.get("status")

    useEffect(() => {
        if(paymentStatus === "true"){
            removeAll()
        }
    }, [paymentStatus, removeAll]);
  return (
    <div className="flex flex-col h-full">
      <UserHeader />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
