'use client'

import {useAuth} from "@/hooks/useAuth";
import Loading from "@/components/Loading";
import {redirect} from "next/navigation";
import {useUser} from "@clerk/nextjs";
import Image from "next/image";

const ProfilePage = () => {
    const {isLoading, userId} = useAuth()
    const {user} = useUser()
    if(isLoading){
        return <Loading />
    }

    if(!userId || !user){
        redirect("/")
    }
    return (
        <div className='max-w-6xl mx-auto px-3 py-5'>
            <Image src={user.imageUrl} alt='User Avatar' width={150} height={150} className='rounded-xl'/>
        </div>
    );
};

export default ProfilePage;