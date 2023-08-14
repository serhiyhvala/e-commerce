'use client'

import {FC, ReactNode} from "react";
import AdminHeader from "@/components/AdminHeader";
import {useAuth} from "@/hooks";
import {redirect} from "next/navigation";

const AuthLayout: FC<{ children: ReactNode }> = ({children}) => {
    const {user, isLoading} = useAuth()

    if(isLoading){
        return <h2>Loading...</h2>
    }

    if(!user){
        redirect('/sign-in')
    }

    if(user && !user.isAdmin){
        redirect('/')
    }
    return (
        <div className="p-3">
            <AdminHeader />
            {children}
        </div>
    );
};

export default AuthLayout;