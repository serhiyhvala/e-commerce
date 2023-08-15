import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MenuIcon, User} from "lucide-react";
import Link from "next/link";
import {useAuth} from "@/hooks/useAuth";

const UserMobileMenu = () => {
    const {userId} = useAuth()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><MenuIcon className='block sm:hidden'/></DropdownMenuTrigger>
            <DropdownMenuContent>
                {!userId ? (
                    <>
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
                    </>
                ) : <DropdownMenuItem>
                    <Link href='/profile' className='w-full flex items-center gap-2'>
                        <User />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMobileMenu;