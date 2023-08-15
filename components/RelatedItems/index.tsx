'use client'

import {FC} from "react";
import ProductCard from "@/components/ProductCard";
import {Expand, ShoppingCart} from "lucide-react";
import {useGetAllProducts} from "@/hooks/useGetAllProducts";
import Skeleton from "@/components/Skeleton";

interface IRelatedItemsProps {
    currentProductId: string
}

const RelatedItems :FC<IRelatedItemsProps>= ({currentProductId}) => {
    const {products, isLoading} = useGetAllProducts()

    const relatedItems = products.filter(item => item.id !== currentProductId).slice(0, 3)
    return (
        <div className="mt-5 flex flex-col gap-5">
            <span className='text-4xl font-bold'>Related Items</span>
            <div className="flex gap-10 items-center justify-center flex-wrap">
                {isLoading && (
                    new Array(3).fill(Math.random()).map(item => (
                        <Skeleton key={item}/>
                    ))
                )}
                {relatedItems.map(item => (
                    <ProductCard key={item.id} link={`/products/${item.id}`} {...item}>
                        <>
                            <span className='rounded-full bg-black p-3 flex justify-center'>
                                <Expand className='text-white'/>
                            </span>
                            <span className='rounded-full bg-black p-3 flex justify-center'>
                                <ShoppingCart className='text-white'/>
                            </span>
                        </>
                    </ProductCard>
                ))}
            </div>
        </div>
    );
};

export default RelatedItems;