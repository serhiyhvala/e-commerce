'use client'

import {useEffect, useState} from "react";
import FeaturedProducts from "@/components/FeaturedProducts";
import FAQ from "@/components/FAQ";

export default function Home() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return <section className='flex flex-1 flex-col justify-center w-full max-w-6xl mx-auto px-3 py-5 gap-10'>
        <div
            className="w-full h-[250px] sm:h-[450px]  bg-gradient-to-r from-cyan-400 to-blue-800 rounded-xl flex items-center justify-center">
            <span className='font-bold text-2xl sm:text-5xl text-white'>Explore Our Products!</span>
        </div>
        <div className="flex flex-col gap-7">
            <span className='font-bold text-3xl pb-3 border-b-2'>Featured Products</span>
            <FeaturedProducts />
        </div>
        <div className="flex flex-col">
            <span className='font-bold text-3xl'>FAQ</span>
            <FAQ />
        </div>
    </section>;
}
