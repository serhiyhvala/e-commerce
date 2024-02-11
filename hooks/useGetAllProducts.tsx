import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

export const useGetAllProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await fetch("/api/products");
        setIsLoading(false);
        return data.json();
      } catch (error) {
        console.error(error);
      }
    };

    getAllProducts().then((data) => setProducts(data));
  }, []);

  return { isLoading, products };
};
