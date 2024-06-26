'use client'

import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Expand, ShoppingCart } from "lucide-react";
import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { useStore } from "@/store/store";

const RelatedProducts = () => {
  const { products } = useGetAllProducts();
  const { handleAddItemToCart } = useStore();
  const featuredProducts = products.slice(0, 3);
  return (
    <div className="flex items-center justify-center">
      {featuredProducts.map((item) => (
        <ProductCard
          key={item.id}
          {...item}
          link={`/products/${item.id}`}
        />
      ))}
    </div>
  );
};

export default RelatedProducts;
