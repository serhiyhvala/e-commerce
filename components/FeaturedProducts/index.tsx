import Skeleton from "@/components/Skeleton";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Expand, ShoppingCart } from "lucide-react";
import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { useStore } from "@/store/store";

const RelatedProducts = () => {
  const { isLoading, products } = useGetAllProducts();
  const { handleAddItemToCart } = useStore();
  const featuredProducts = products.slice(0, 3);
  return (
    <div className="flex items-center justify-center flex-wrap gap-16">
      {isLoading &&
        new Array(3).fill(Math.random()).map((item) => <Skeleton key={item} />)}
      {featuredProducts.map((item) => (
        <ProductCard
          key={item.id}
          {...item}
          link={`/products/${item.id}`}
          likeButton
        >
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
  );
};

export default RelatedProducts;
