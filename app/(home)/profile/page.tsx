'use client'

import {useAuth} from "@/hooks/useAuth";
import Loading from "@/components/Loading";
import {redirect} from "next/navigation";
import {useUser} from "@clerk/nextjs";
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import LikedProducts from "@/components/LikedProducts";
import Orders from "@/components/Orders";

const ProfilePage = () => {
    const {isLoading, userId} = useAuth()
    const {user} = useUser()

    if (isLoading) {
        return <Loading/>
    }

    if (!userId || !user) {
        redirect("/sign-in")
    }
    return (
        <div className='max-w-6xl mx-auto px-3 py-5 w-full flex flex-col gap-16 h-full'>
            <span className='text-4xl font-bold pb-5 border-b-2 flex items-start'>Profile Info</span>
            <div className="flex items-center justify-center flex-wrap gap-5">
                <Image src={user.imageUrl} alt='Hello' width={270} height={270} className='rounded-xl'/>
                <div className="flex flex-col gap-5">
                    {user.fullName && (
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='fullName' className='font-bold text-xl'>Full Name</Label>
                            <Input value={user.fullName} disabled id='fullName'/>
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor='emailAddress' className='font-bold text-xl'>Email address</Label>
                        <Input value={user.emailAddresses[0].emailAddress} disabled id='emailAddress'/>
                    </div>
                    {user.createdAt && (
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='createdAt' className='font-bold text-xl'>Created At</Label>
                            <Input value={new Date(user.createdAt).toLocaleDateString('en-US')} disabled
                                   id='createdAt'/>
                        </div>
                    )}
                </div>
            </div>
            <LikedProducts />
            <Orders />
        </div>
    );
};

export default ProfilePage;