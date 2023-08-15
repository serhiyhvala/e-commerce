'use client'

import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import AlertModal from "@/components/AlertModal";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import Link from "next/link";
import {useGetCurrentProduct} from "@/hooks/useGetCurrentProduct";

const Product = () => {
    const {id} = useParams()
    const {isLoading, currentProduct, setIsLoading} = useGetCurrentProduct(id as string)
    const router = useRouter()
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
        return <Loading />
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
            <div className="flex flex-col items-center gap-3">
                <Image src={currentProduct.image} alt={currentProduct.title} className='rounded-xl' width={300}
                       height={300}/>
                <div className="flex flex-col w-1/4 gap-2">
                    <span className='text-3xl font-bold border-b-2'>{currentProduct.title}</span>
                    <span className='text-sm text-gray-500'>{currentProduct.description}</span>
                    <span className='p-2 border-2 rounded-sm'>Price: {currentProduct.price}$</span>
                    <Button asChild>
                        <Link href={`/admin/products/edit/${currentProduct.id}`}>Edit Product</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Product;