'use client'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {LayoutDashboard, User} from "lucide-react";
import Link from "next/link";
import {SignOutButton, useUser} from "@clerk/nextjs";
import {useState} from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {useAuth} from "@/hooks/useAuth";

const UserProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {user: currentUser} = useAuth()
    const {user} = useUser()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger onClick={() => setIsOpen(true)}>
                <Avatar>
                    <AvatarImage src={user?.imageUrl} alt="User Profile" />
                </Avatar>
            </DropdownMenuTrigger>
            {isOpen && (
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setIsOpen(false)}>
                        <Link href="/profile" className='w-full flex items-center gap-2'>
                            <User className='w-5 h-5'/>
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    {currentUser?.isAdmin && (
                        <DropdownMenuItem onClick={() => setIsOpen(false)}>
                            <Link href="/admin" className='w-full flex items-center gap-2'>
                                <LayoutDashboard className='w-5 h-5'/>
                                <span>Admin</span>
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => setIsOpen(false)}>
                        <SignOutButton />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};

export default UserProfileMenu;