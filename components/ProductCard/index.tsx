import {FC, ReactNode} from "react";
import {Product} from "@prisma/client";
import Image from "next/image";
import {cropText} from "@/utils/cropText";

interface IProductCard extends Product {
    children: ReactNode
}

const ProductCard :FC<IProductCard>= ({price, description, image, title, children}) => {
    return (
        <div className='border-2 shadow-xl rounded-xl flex flex-col gap-3 p-3 group cursor-pointer'>
            <div className='relative'>
                <Image src={image} alt={title} width={300} height={300} className='w-[300px] h-[300px] rounded-xl object-cover'/>
                <div className='opacity-0 group-hover:opacity-100 transition duration-300 absolute bottom-5 px-6 flex gap-3 items-center justify-center w-full'>
                    {children}
                </div>
            </div>
            <div className="flex flex-col">
                <span className='font-bold text-lg'>{title}</span>
                <span className="text-gray-500">{cropText(description, 30)}</span>
            </div>
            <span className='font-bold'>${price}</span>
        </div>
    );
};

export default ProductCard;