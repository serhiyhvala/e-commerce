import {UserButton} from "@clerk/nextjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import MobileMenu from "@/components/MobileMenu";
import {BadgePlus, GalleryVertical, ShoppingBasket} from "lucide-react";

const AdminHeader = () => {
    return (
        <div className="flex justify-between items-center border-b-2 pb-3">
            <div className='flex items-center gap-4'>
                <span className="text-2xl font-bold">
                    <Link href='/admin'>Admin Panel</Link>
                </span>
                <ul className='hidden items-center gap-4 sm:flex'>
                    <li>
                        <Button asChild>
                            <Link href="/admin/products" className='flex items-center gap-2'>
                                <GalleryVertical className='w-5 h-5'/>
                                <span>Products</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button asChild>
                            <Link href="/admin/orders" className='flex items-center gap-2'>
                                <ShoppingBasket className='h-5 w-5'/>
                                <span>Orders</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant='outline' asChild>
                            <Link href="/admin/new-product" className='flex items-center gap-2'>
                                <BadgePlus className='h-5 w-5'/>
                                <span>New Product</span>
                            </Link>
                        </Button>
                    </li>
                </ul>
            </div>
            <div className="flex gap-2 items-center">
                <UserButton afterSignOutUrl="/"/>
                <MobileMenu/>
            </div>
        </div>
    );
};

export default AdminHeader;