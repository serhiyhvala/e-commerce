"use client";

import {useEffect, useState} from "react";
import {Product} from "@prisma/client";

export const useGetCurrentProduct = (id: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentProduct, setCurrentProduct] = useState<Product>();
    useEffect(() => {
        const getCurrentProduct = async () => {
            try {
                const data = await fetch(`/api/products/get/${id}`, {next: {revalidate: 0}});
                setIsLoading(false);
                return data.json();
            } catch (error) {
                console.error(error);
            }
        };
        getCurrentProduct().then(data => setCurrentProduct(data));
    }, [id]);
    return {currentProduct, isLoading, setIsLoading};
};
