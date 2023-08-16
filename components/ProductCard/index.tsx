import {FC, ReactNode, useState} from "react";
import {Product} from "@prisma/client";
import Image from "next/image";
import {cropText} from "@/utils/cropText";
import {Heart} from "lucide-react";
import toast from "react-hot-toast";
import {useAuth} from "@/hooks/useAuth";
import axios from "axios";
import {cn} from "@/lib/utils";

interface IProductCard extends Product {
    children: ReactNode,
    link: string,
    likeButton?: boolean
}

const ProductCard: FC<IProductCard> = ({id, price, description, image, title, children, link, likeButton}) => {
    const [clicked, setClicked] = useState(false)
    const {userId, user} = useAuth()

    const handleLikeButton = async () => {
        try {
            setClicked(true)
            const {data} = await axios.post('/api/user/products', {userId, id})
            toast.success('Product added to your likes')
        } catch (error) {
            console.error(error)
            setClicked(false)
            toast.error("Something went wrong")
        }
    }

    const isProductLiked = !!user?.likedProducts.find(item => item.id === id)

    return (
        <div className='border-2 shadow-xl rounded-xl flex flex-col gap-3 p-3 group'>
            <div className='relative'>
                <Image src={image} alt={title} width={300} height={300}
                       className='w-[300px] h-[300px] rounded-xl object-cover'/>
                <div
                    className='opacity-0 group-hover:opacity-100 transition duration-300 absolute bottom-5 px-6 flex gap-3 items-center justify-center w-full'>
                    {children}
                </div>
            </div>
            <div className="flex flex-col">
                <span className='font-bold text-lg'>{title}</span>
                <span className="text-gray-500">{cropText(description, 30)}</span>
            </div>
            {likeButton ? (
                <div className='flex justify-between items-center'>
                    <span className='font-bold'>${price}</span>
                    <Heart onClick={handleLikeButton} className={cn('text-red-500 cursor-pointer', isProductLiked ? 'fill-red-500' : clicked && 'fill-red-500')}/>
                </div>
            ) : (
                <span className='font-bold'>${price}</span>
            )}
        </div>
    );
};

export default ProductCard;