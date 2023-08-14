'use client'

import {Button} from "@/components/ui/button";
import {ChangeEvent, FormEvent, useState} from "react";
import Image from "next/image";
import {IProduct} from "@/types/product.types";
import ImageUpload from "@/components/ImageUpload";
import {Trash} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Product} from "@prisma/client";

const NewProduct = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<IProduct>({
        image: "",
        title: "",
        price: 0,
        description: ""
    })
    const router = useRouter()

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleUpload = (result: any) => {
        setForm({...form, image: result.info.secure_url})
    }

    const handleDeleteImage = () => {
        setForm({...form, image: ''})
    }

    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        if (!form.image.length) {
            toast.error("Image required!")
            setIsLoading(false)
            return
        }
        if (form.price === 0) {
            toast.error("Price must be bigger than 0!")
            setIsLoading(false)
            return
        }
        try {
            const {data} = await axios.post<Product>('/api/products', form)
            setIsLoading(false)
            router.push(`/admin/products/${data.id}`)
            setForm({title: '', description: "", image: '', price: 0})
            toast.success('Product Created Successfully')
        } catch (error){
            setIsLoading(false)
            toast.error("Something went wrong")
        }
    }
    return (
        <div className='mt-3 flex flex-col gap-6'>
            <div className="border-b-2 pb-3 flex flex-col">
                <span className='text-4xl font-bold'>Create product</span>
                <span className='font-bold text-gray-500'>Add a new product</span>
            </div>
            <form className='flex flex-col gap-6' onSubmit={handleSubmitForm}>
                <div className="flex flex-col gap-3 items-start">
                    <Label htmlFor='iamge'>Images</Label>
                    {form.image ?
                        <div className="relative w-[300px]">
                            <Image src={form.image} alt='Image' width={300} height={300} className='rounded-xl'/>
                            <Button variant="destructive" className='absolute top-2 right-2'
                                    onClick={handleDeleteImage}><Trash/></Button>
                        </div>
                        : (
                            <ImageUpload handleUpload={handleUpload}/>
                        )}
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="">
                        <Label htmlFor='title'>Name</Label>
                        <Input id="title" name='title' placeholder='Product Name'
                               value={form.title}
                               onChange={handleChangeInputs}
                               required
                        />
                    </div>
                    <div className="">
                        <Label htmlFor='price'>Price</Label>
                        <Input id="price" name='price' value={form.price} onChange={handleChangeInputs} required/>
                    </div>
                    <div className="">
                        <Label htmlFor='description'>Description</Label>
                        <Textarea className='resize-none' id="description" name='description'
                                  placeholder='Product Description'
                                  onChange={handleChangeTextArea}
                                  value={form.description} required/>
                    </div>
                </div>
                <Button type='submit' className='self-start' disabled={isLoading}>Create</Button>
            </form>
        </div>
    );
};

export default NewProduct;