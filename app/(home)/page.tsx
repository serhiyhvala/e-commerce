import FeaturedProducts from "@/components/FeaturedProducts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WaitList } from "@/components/WaitList";

export default function Home() {
  return (
    <>
      <div className="h-[calc(100vh-60px)] z-0 w-full bg-neutral-950 flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-7xl text-3xl lg:text-9xl relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Aceternity
        </h1>
      </div>
      <section className="flex flex-1 flex-col justify-center w-full mx-auto pt-5 gap-10">
        <div className="container">
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
        </div>
        <WaitList />
      </section>
    </>
  );
}
