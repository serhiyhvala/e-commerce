import {FC} from "react";
import {Product} from "@prisma/client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface IProductCard extends Product {}

const ProductCard :FC<IProductCard>= ({price, description, image, title, id}) => {
    return (
        <div className='bg-gray-200 shadow-xl rounded-xl flex flex-col gap-3 relative'>
            <Image src={image} alt={title} width={300} height={300} className='rounded-t-xl'/>
            <span className='absolute top-0 right-0 bg-blue-500 rounded-xl p-2 text-white'>{price}$</span>
            <div className="p-2 flex flex-col gap-3">
                <div className='flex flex-col'>
                    <span className='text-2xl font-bold'>{title}</span>
                    <span className='text-sm text-gray-500'>{description}</span>
                </div>
                <Button asChild>
                    <Link href={`/admin/products/${id}`}>View Details</Link>
                </Button>
                <Button asChild variant='outline' className='border-gray-950'>
                    <Link href={`/admin/products/${id}`}>Edit</Link>
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;