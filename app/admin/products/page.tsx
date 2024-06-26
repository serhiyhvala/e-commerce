"use client";

import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { Edit, Expand } from "lucide-react";
import Link from "next/link";

const ProductsPage = () => {
  const { isLoading, products } = useGetAllProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (!products) {
    return "Not Found";
  }
  return (
    <div className="mt-3 flex flex-col gap-3">
      <div className="border-b-2 pb-3 flex flex-col">
        <span className="text-4xl font-bold">All Products</span>
        <span className="font-bold text-gray-500">Show your all products</span>
      </div>
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            link={`/admin/products/${product.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
