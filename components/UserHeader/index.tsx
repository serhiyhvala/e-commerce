'use client'

import Link from "next/link";
import {ShoppingBasket} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";
import {UserButton} from "@clerk/nextjs";
import UserMobileMenu from "@/components/UserMobileMenu";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

const UserHeader = () => {
    const [scroll, setIsScroll] = useState(false)
    const {userId, user} = useAuth()

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 0) {
                setIsScroll(true)
            } else {
                setIsScroll(false)
            }
        };
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <header className={cn('w-full border-b-2 sticky inset-0 bg-white z-10', scroll && 'shadow-xl')}>
            <div className="max-w-6xl mx-auto p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Link href='/' className='uppercase font-bold text-2xl'>Store</Link>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant='outline'>
                        <ShoppingBasket/>
                    </Button>
                    <div className='items-center gap-2 hidden sm:flex'>
                        {!userId ? (
                            <>
                                <Button asChild variant='secondary'>
                                    <Link href='/sign-in'>Sign In</Link>
                                </Button>
                                <Button asChild>
                                    <Link href='/sign-up'>Sign Up</Link>
                                </Button>
                            </>
                        ) : (
                            <Button asChild>
                                <Link href='/profile'>Profile</Link>
                            </Button>
                        )}
                    </div>
                    {user?.isAdmin ? (
                        <div className='flex gap-2 items-center'>
                            <Button asChild variant='outline'>
                                <Link href='/admin'>Admin</Link>
                            </Button>
                            <UserButton/>
                        </div>
                    ) : <UserButton/>}
                    <UserMobileMenu/>
                </div>
            </div>
        </header>
    );
};

export default UserHeader;