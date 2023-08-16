import {useAuth} from "@/hooks/useAuth";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Expand} from "lucide-react";

const Orders = () => {
    const {user} = useAuth()
    return (
        <>
            <span className='text-4xl font-bold pb-5 border-b-2 flex items-start'>Orders</span>
            <div className="flex items-center gap-5 flex-wrap">
                {user?.orders.length ? (
                    user.orders.map(item => (
                        <div className='flex justify-center sm:justify-start flex-wrap bg-gray-100 rounded-xl p-2 gap-5' key={item.id}>
                            <div className="flex flex-col gap-2">
                                <span className='text-2xl font-bold pb-2 border-b-2'>Products</span>
                                {item.products.map(item => (
                                    <div className="flex flex-col gap-2 relative" key={item.id}>
                                        <Image src={item.image} alt={item.title} width={200} height={200}
                                               className='rounded-xl'/>
                                        <Button asChild>
                                            <Link href={`/products/${item.id}`} className='rounded-full bg-black p-3 flex justify-center absolute top-2 right-2'>
                                                <Expand className='text-white'/>
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-2xl font-bold pb-2 border-b-2'>Details</span>
                                <div className='flex items-center gap-2'>
                                    <span className='font-bold'>Full Name:</span>
                                    <span>{item.fullName}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='font-bold'>Email:</span>
                                    <span>{item.email}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='font-bold'>Address:</span>
                                    <span>{item.address}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='font-bold'>Total Price:</span>
                                    <span>${item.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : <span className='text-5xl font-bold'>You don&apos;t have any liked products</span>}
            </div>
        </>
    );
};

export default Orders;