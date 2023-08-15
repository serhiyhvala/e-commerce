'use state'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {LayoutDashboard} from "lucide-react";
import Link from "next/link";
import {SignOutButton, useUser} from "@clerk/nextjs";
import {useState} from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

const UserProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
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
                            <LayoutDashboard className='w-5 h-5'/>
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsOpen(false)}>
                        <SignOutButton />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};

export default UserProfileMenu;