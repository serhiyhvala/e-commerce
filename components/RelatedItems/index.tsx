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
      <div className="flex gap-10 items-center justify-center flex-wrap">
        {isLoading &&
          new Array(3)
            .fill(Math.random())
            .map((item) => <Skeleton key={item} />)}
        {relatedItems.map((item) => (
          <ProductCard key={item.id} link={`/products/${item.id}`} {...item}>
            <>
              <Link
                href={`/products/${item.id}`}
                className="rounded-full bg-black p-3 flex justify-center"
              >
                <Expand className="text-white" />
              </Link>
              <span className="rounded-full bg-black p-3 flex justify-center cursor-pointer">
                <ShoppingCart
                  className="text-white"
                  onClick={() => handleAddItemToCart(item)}
                />
              </span>
            </>
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
