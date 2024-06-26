"use client";

import { FC } from "react";
import ProductCard from "@/components/ProductCard";
import { Expand, ShoppingCart } from "lucide-react";
import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";
import { useStore } from "@/store/store";

interface IRelatedItemsProps {
  currentProductId: string;
}

const RelatedItems: FC<IRelatedItemsProps> = ({ currentProductId }) => {
  const { products, isLoading } = useGetAllProducts();
  const { handleAddItemToCart } = useStore();

  const relatedItems = products
    .filter((item) => item.id !== currentProductId)
    .slice(0, 3);
  return (
    <div className="mt-5 flex flex-col gap-5">
      <span className="text-4xl font-bold">Related Items</span>
      <div className="flex items-center justify-center mb-10">
        {relatedItems.map((item) => (
          <ProductCard key={item.id} link={`/products/${item.id}`} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
