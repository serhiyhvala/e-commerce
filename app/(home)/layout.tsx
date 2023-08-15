import {FC, ReactNode} from "react";
import UserHeader from "@/components/UserHeader";
import Footer from "@/components/Footer";

const UserLayout :FC<{children: ReactNode}>= ({children}) => {
    return (
        <div className="flex flex-col h-full">
            <UserHeader />
                {children}
            <Footer />
        </div>
    );
};

export default UserLayout;