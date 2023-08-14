import {UserButton} from "@clerk/nextjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const AdminHeader = () => {
    return (
        <div className="flex justify-between items-center border-b-2 pb-3">
            <div className='flex items-center gap-4'>
                <span className="text-2xl font-bold">
                    <Link href='/admin'>Admin Panel</Link>
                </span>
                <ul className='flex items-center gap-4'>
                    <li>
                        <Button asChild>
                            <Link href="/admin/products">Products</Link>
                        </Button>
                    </li>
                    <li>
                        <Button asChild>
                            <Link href="/admin/orders">Orders</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant='outline' asChild>
                            <Link href="/admin/new-product">New Product</Link>
                        </Button>
                    </li>
                </ul>
            </div>
            <UserButton afterSignOutUrl="/"/>
        </div>
    );
};

export default AdminHeader;