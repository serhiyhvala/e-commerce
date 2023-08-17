'use client'

import {useGetAllProducts} from "@/hooks/useGetAllProducts";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {Expand, ShoppingCart} from "lucide-react";
import {useStore} from "@/store/store";
import {useEffect, useState} from "react";
import {Product} from "@prisma/client";
import Loading from "@/components/Loading";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const ProductsPage = () => {
    const {isLoading, products} = useGetAllProducts()
    const [sortedProducts, setSortedProducts] = useState<Product[]>([])
    const [sortedType, setSortedType] = useState<"asc" | "desc" | "">("")
    const {handleAddItemToCart} = useStore()

    useEffect(() => {
        console.log(sortedType)
        if (sortedType === "asc") {
            setSortedProducts(sortedProducts.sort((a, b) => a.price - b.price))
        } else {
            setSortedProducts(sortedProducts.sort((a, b) => b.price - a.price))
        }
    }, [sortedType])

    useEffect(() => {
        setSortedProducts(products)
    }, [products])

    if (isLoading) {
        return <Loading/>
    }
    return (
        <section className='flex flex-1 flex-col justify-center w-full max-w-6xl mx-auto px-3 py-5 gap-10'>
            <div
                className="w-full h-[250px] sm:h-[450px]  bg-gradient-to-r from-sky-200 to-sky-800 rounded-xl flex items-center justify-center">
                <span className='font-bold text-2xl sm:text-5xl text-white'>All Products!</span>
            </div>
            <div className="self-start bg-black border-2 dark:bg-white text-white dark:text-black px-3 py-2 rounded-xl">
                <DropdownMenu>
                    <DropdownMenuTrigger>Sort by: {sortedType}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSortedType("asc")}>ASC</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortedType("desc")}>DESC</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-16">
                {sortedProducts.map(item => (
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
        </section>
    );
};

export default ProductsPage;