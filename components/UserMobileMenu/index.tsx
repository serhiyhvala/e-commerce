import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MenuIcon} from "lucide-react";
import Link from "next/link";

const UserMobileMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><MenuIcon className='block sm:hidden'/></DropdownMenuTrigger>
            <DropdownMenuContent>
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
    );
};

export default UserMobileMenu;