'use client'

import {useParams} from "next/navigation";
import {useGetCurrentProduct} from "@/hooks/useGetCurrentProduct";
import Loading from "@/components/Loading";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronUp, LayoutDashboard, ShoppingCart} from "lucide-react";
import {useAuth} from "@/hooks/useAuth";
import Link from "next/link";
import RelatedItems from "@/components/RelatedItems";
import {cropText} from "@/utils/cropText";
import {useState} from "react";

const ProductPage = () => {
    const {id} = useParams()
    const {user} = useAuth()
    const {isLoading, currentProduct} = useGetCurrentProduct(id as string)
    const [isOpen, setIsOpen] = useState(false)
    if (isLoading) {
        return <Loading/>
    }
    if (!currentProduct) {
        return 'Not Found'
    }

    const handleOpenDescription = () => setIsOpen(!isOpen)
    const productDescription = isOpen ? currentProduct.description : cropText(currentProduct.description, 100)

    return (
        <div className='max-w-6xl mx-auto px-3 py-5'>
            <div className="flex flex-wrap gap-10 items-start justify-center pb-10 border-b-2">
                <Image src={currentProduct.image}
                       alt={currentProduct.title}
                       width={400} height={400}
                       className='border-2 rounded-xl flex-none'
                />
                <div className="flex flex-col gap-3 flex-1">
                    <div className="flex flex-col gap-3 border-b-2 pb-2">
                        <span className='text-3xl font-bold'>{currentProduct.title}</span>
                        <span className='text-xl font-bold'>${currentProduct.price}.00</span>
                    </div>
                    <div className='flex flex-col gap-2 pb-2 border-b-2 cursor-pointer'>
                        <span className='text-lg text-gray-500'>{productDescription}</span>
                        <div className="flex items-center gap-2" onClick={handleOpenDescription}>
                            <span className='text-blue-500 cursor-pointer font-medium self-start'>
                                {isOpen ? 'Show less' : "Show more"}
                            </span>
                            {isOpen ? <ChevronUp className='text-blue-500'/> : <ChevronDown className='text-blue-500'/>}
                        </div>
                    </div>
                    {user?.isAdmin ? (
                        <div className='flex items-center gap-2'>
                            <Button>
                                <div className="flex items-center gap-2">
                                    <span>Add To Cart</span>
                                    <ShoppingCart/>
                                </div>
                            </Button>
                            <Button asChild>
                                <Link href={`/admin/products/edit/${currentProduct.id}`}
                                      className="flex items-center gap-2">
                                    <span>Edit</span>
                                    <LayoutDashboard/>
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <Button className='self-start'>
                            <div className="flex items-center gap-2">
                                <span>Add To Cart</span>
                                <ShoppingCart/>
                            </div>
                        </Button>
                    )}
                </div>
            </div>
            <RelatedItems currentProductId={currentProduct.id}/>
        </div>
    );
};

export default ProductPage;