"use client";

import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { IProduct } from "@/types/product.types";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import Form from "@/components/Form";

const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<IProduct>({
    title: "",
    description: "",
    price: 0,
    image: "",
  });
  const router = useRouter();

  const handleSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    form: IProduct,
  ) => {
    event.preventDefault();
    setIsLoading(true);
    if (!form.image.length) {
      toast.error("Image required!");
      setIsLoading(false);
      return;
    }
    if (form.price === 0) {
      toast.error("Price must be bigger than 0!");
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await axios.post<Product>("/api/products/create", form);
      setIsLoading(false);
      router.push(`/admin/products/${data.id}`);
      setForm({ title: "", description: "", image: "", price: 0 });
      toast.success("Product Created Successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-3 flex flex-col gap-6">
      <div className="border-b-2 pb-3 flex flex-col">
        <span className="text-4xl font-bold">Create product</span>
        <span className="font-bold text-gray-500">Add a new product</span>
      </div>
      <Form formState={form} handleSubmitForm={handleSubmitForm}>
        <Button type="submit" className="self-start" disabled={isLoading}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default NewProduct;
