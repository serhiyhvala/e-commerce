import {useEffect, useState} from "react";
import {Product} from "@prisma/client";
import axios from "axios";

export const useGetAllProducts = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const getAllProducts = async() => {
            try {
                const {data} = await axios.get("/api/products")
                setIsLoading(false)
                return data
            } catch (error){
                console.error(error)
            }
        }

        getAllProducts().then(data => setProducts(data))
    }, [])

    return {isLoading, products}
}