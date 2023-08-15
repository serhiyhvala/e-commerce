'use client'

import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import {useGetAllProducts} from "@/hooks/useGetAllProducts";
import {Edit, Expand} from "lucide-react";
import Link from "next/link";

const ProductsPage = () => {
    const {isLoading, products} = useGetAllProducts()

    if (isLoading) {
        return <Loading/>
    }

    if (!products) {
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
                    <ProductCard key={product.id} {...product}>
                        <Link href={`/admin/products/${product.id}`}
                              className='rounded-full bg-black p-3 flex justify-center'>
                            <Expand className='text-white'/>
                        </Link>
                        <Link href={`/admin/products/edit/${product.id}`}
                              className='rounded-full bg-black p-3 flex justify-center'>
                            <Edit className='text-white'/>
                        </Link>
                    </ProductCard>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;