'use client'

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {IProduct} from "@/types/product.types";
import axios from "axios";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import AlertModal from "@/components/AlertModal";
import toast from "react-hot-toast";

const Product = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [currentProduct, setCurrentProduct] = useState<IProduct>()
    const {id} = useParams()
    const router = useRouter()
    useEffect(() => {
        const getCurrentProduct = async () => {
            try {
                const {data} = await axios.get(`/api/products/${id}`)
                setIsLoading(false)
                return data
            } catch (error) {
                console.error(error)
            }
        }
        getCurrentProduct().then(data => setCurrentProduct(data))
    }, [id])

    const submitHandler = async() => {
        setIsLoading(true)
        try {
            const {data} = await axios.delete(`/api/products/${id}`)
            setIsLoading(false)
            toast.success(data)
            router.push('/admin')
        } catch (error){
            console.error(error)
            toast.error("Something went wrong")
        }
    }

    if (isLoading) {
        return 'Loading...'
    }
    if (!currentProduct) {
        return "Not Found"
    }
    return (
        <div className='mt-3 flex flex-col gap-5'>
            <div className="border-b-2 pb-3 flex justify-between items-center">
                <div className='flex flex-col'>
                    <span className='text-4xl font-bold'>Settings</span>
                    <span className='font-bold text-gray-500'>Delete or update your product</span>
                </div>
                <AlertModal dialogTitle='Are u sure?'
                            dialogDescription='This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.'
                            submitHandler={submitHandler}
                >
                    <Button variant='destructive' disabled={isLoading}><Trash/></Button>
                </AlertModal>
            </div>
            <div className="flex flex-wrap gap-3 items-center justify-center">
                <Image src={currentProduct.image} alt={currentProduct.title} className='rounded-xl' width={300}
                       height={300}/>
                <div className="flex flex-col gap-3">
                    <span>Title: {currentProduct.title}</span>
                    <span>Description: {currentProduct.description}</span>
                    <span>Price: {currentProduct.price}$</span>
                </div>
            </div>
        </div>
    );
};

export default Product;