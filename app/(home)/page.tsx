'use client'

import {useGetAllProducts} from "@/hooks/useGetAllProducts";
import ProductCard from "@/components/ProductCard";
import {Expand, ShoppingCart} from "lucide-react";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";
import {useStore} from "@/store/store";

export default function Home() {
    const {isLoading, products} = useGetAllProducts()
    const {handleAddItemToCart} = useStore()

    return <section className='flex flex-1 flex-col justify-center w-full max-w-6xl mx-auto px-3 py-5 gap-6'>
        <div
            className="w-full h-[250px] sm:h-[450px]  bg-gradient-to-r from-cyan-400 to-blue-800 rounded-xl flex items-center justify-center">
            <span className='font-bold text-2xl sm:text-5xl text-white'>Explore Our Products!</span>
        </div>
        <div className="flex flex-col gap-3">
            <span className='font-bold text-3xl'>Featured Products</span>
            <div className="flex items-center justify-center flex-wrap gap-16">
                {isLoading && (
                    new Array(6).fill(Math.random()).map(item => (
                        <Skeleton key={item}/>
                    ))
                )}
                {products.map(item => (
                    <ProductCard key={item.id} {...item} link={`/products/${item.id}`} likeButton>
                        <>
                            <Link href={`/products/${item.id}`}
                                  className='rounded-full bg-black p-3 flex justify-center'>
                                <Expand className='text-white'/>
                            </Link>
                            <span className='rounded-full bg-black p-3 flex justify-center cursor-pointer'>
                                <ShoppingCart className='text-white' onClick={() => handleAddItemToCart(item)}/>
                            </span>
                        </>
                    </ProductCard>
                ))}
            </div>
        </div>
    </section>;
}
