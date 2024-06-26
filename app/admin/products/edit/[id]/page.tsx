"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetCurrentProduct } from "@/hooks/useGetCurrentProduct";
import Loading from "@/components/Loading";
import { FormEvent, useEffect, useState } from "react";
import { IProduct } from "@/types/product.types";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { Product } from "@prisma/client";
import Form from "@/components/Form";

const EditProduct = () => {
  const { id } = useParams();
  const { currentProduct, isLoading } = useGetCurrentProduct(id as string);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IProduct>();
  const router = useRouter();

  useEffect(() => {
    if (currentProduct) {
      const { title, description, image, price } = currentProduct;
      setForm({ title, description, price, image, priceId: "" });
    }
  }, [currentProduct]);

  const handleSubmitForm = async (
    event: FormEvent<HTMLFormElement>,
    form: IProduct,
  ) => {
    event.preventDefault();
    setLoading(true);
    if (!form.image.length) {
      toast.error("Image required!");
      setLoading(false);
      return;
    }
    if (form.price === 0) {
      toast.error("Price must be bigger than 0!");
      setLoading(false);
      return;
    }
    try {
      await axios.patch<Product>(
        `/api/products/edit/${currentProduct?.id}`,
        form,
      );
      setLoading(false);
      router.push(`/admin/products/${currentProduct?.id}`);
      toast.success("Product Updated Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-3 flex flex-col gap-6">
      <div className="border-b-2 pb-3 flex flex-col">
        <span className="text-4xl font-bold">Edit product</span>
        <span className="font-bold text-gray-500">Edit your product</span>
      </div>
      {form?.description.length && (
        <Form formState={form} handleSubmitForm={handleSubmitForm}>
          <Button type="submit" className="self-start" disabled={loading}>
            Update
          </Button>
        </Form>
      )}
    </div>
  );
};

export default EditProduct;
