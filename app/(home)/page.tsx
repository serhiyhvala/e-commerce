"use client";

import { useEffect, useState } from "react";
import FeaturedProducts from "@/components/FeaturedProducts";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="flex flex-1 flex-col justify-center w-full max-w-6xl mx-auto px-3 py-5 gap-10">
      <div className="w-full h-[250px] sm:h-[450px]  bg-gradient-to-r from-cyan-400 to-blue-800 rounded-xl flex items-center justify-center">
        <span className="font-bold text-2xl sm:text-5xl text-white">
          Explore Our Products!
        </span>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex justify-between items-center pb-3 border-b-2 flex-wrap gap-3">
          <span className="font-bold text-3xl">Featured Products</span>
          <Link
            href="/products"
            className="flex items-center gap-3 hover:text-blue-500 transition"
          >
            <span>All Products</span>
            <ArrowRight />
          </Link>
        </div>
        <FeaturedProducts />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-3xl">FAQ</span>
        <FAQ />
      </div>
    </section>
  );
}
