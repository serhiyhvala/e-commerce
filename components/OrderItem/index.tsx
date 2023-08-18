import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Expand} from "lucide-react";
import {FC} from "react";
import {IOrder} from "@/types/user.types";

const OrderItem:FC<IOrder> = ({products,fullName, address, email,totalPrice  }) => {
    return (
        <div className='flex justify-center sm:justify-start flex-wrap border-2 rounded-xl p-2 gap-5'>
            <div className="flex flex-col gap-2">
                <span className='text-2xl font-bold pb-2 border-b-2'>Products</span>
                {products.map(item => (
                    <div className="flex flex-col gap-2 relative" key={item.id}>
                        <Image src={item.image} alt={item.title} width={200} height={200}
                               className='rounded-xl'/>
                        <Button asChild>
                            <Link href={`/products/${item.id}`} className='rounded-full bg-black p-3 flex justify-center absolute top-2 right-2'>
                                <Expand className='dark:text-black text-white'/>
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <span className='text-2xl font-bold pb-2 border-b-2'>Details</span>
                <div className='flex items-center gap-2'>
                    <span className='font-bold'>Full Name:</span>
                    <span>{fullName}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-bold'>Email:</span>
                    <span>{email}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-bold'>Address:</span>
                    <span>{address}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-bold'>Total Price:</span>
                    <span>${totalPrice}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;