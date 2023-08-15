'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import {Product} from "@prisma/client";

export const useGetCurrentProduct = (id: string) => {
    const [isLoading, setIsLoading] = useState(true)
    const [currentProduct, setCurrentProduct] = useState<Product>()
    useEffect(() => {
        const getCurrentProduct = async () => {
            try {
                const {data} = await axios.get<Product>(`/api/products/get/${id}`)
                setIsLoading(false)
                return data
            } catch (error) {
                console.error(error)
            }
        }
        getCurrentProduct().then(data => setCurrentProduct(data))
    }, [id])
    return {currentProduct, isLoading, setIsLoading}
}