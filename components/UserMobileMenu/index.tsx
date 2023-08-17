import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MenuIcon} from "lucide-react";
import Link from "next/link";
import {useAuth} from "@/hooks/useAuth";
import UserProfileMenu from "@/components/UserProfileMenu";

const UserMobileMenu = () => {
    const {userId} = useAuth()
    return (
        !userId ? (
            <DropdownMenu>
                <DropdownMenuTrigger><MenuIcon
                    className='block sm:hidden'/></DropdownMenuTrigger>
                <DropdownMenuContent className='w-[200px]'>
                    <DropdownMenuItem>
                        <Link href="/sign-in" className='w-full flex items-center gap-2'>
                            <span>Sign In</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/sign-up" className='w-full flex items-center gap-2'>
                            <span>Sign Up</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ) : (<div className='block sm:hidden'><UserProfileMenu/></div>)

    );
};

export default UserMobileMenu;