'use client'

import {useEffect, useState} from "react";
import {Product} from "@prisma/client";
import axios from "axios";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const getAllProducts = async() => {
            try {
                const {data} = await axios.get("/api/products")
                setIsLoading(false)
                return data
            } catch (error){
                console.error(error)
            }
        }

        getAllProducts().then(data => setProducts(data))
    }, [])

    if(isLoading){
        return <Loading />
    }

    if(!products){
        return "Not Found"
    }
    return (
        <div className='mt-3 flex flex-col gap-3'>
            <div className="border-b-2 pb-3 flex flex-col">
                <span className='text-4xl font-bold'>All Products</span>
                <span className='font-bold text-gray-500'>Show your all products</span>
            </div>
            <div className="flex flex-wrap gap-5 items-center justify-center sm:justify-start">
                {products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;