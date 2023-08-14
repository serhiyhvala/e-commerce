import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {BadgePlus, GalleryVertical, MenuIcon, ShoppingBasket} from "lucide-react";

const MobileMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><MenuIcon className='block sm:hidden'/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href="/admin/products" className='flex items-center gap-2'>
                        <GalleryVertical className='w-5 h-5'/>
                        <span>Products</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/admin/orders" className='flex items-center gap-2'>
                        <ShoppingBasket className='h-5 w-5'/>
                        <span>Orders</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/admin/new-product" className='flex items-center gap-2'>
                        <BadgePlus className='h-5 w-5'/>
                        <span>New Product</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MobileMenu;