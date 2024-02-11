"use client";

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  ShoppingCart,
  Trash,
} from "lucide-react";
import AlertModal from "@/components/AlertModal";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useGetCurrentProduct } from "@/hooks/useGetCurrentProduct";

const Product = () => {
  const { id } = useParams();
  const { isLoading, currentProduct, setIsLoading } = useGetCurrentProduct(
    id as string,
  );
  const router = useRouter();
  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`/api/products/edit/${id}`);
      setIsLoading(false);
      toast.success(data);
      router.push("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (!currentProduct) {
    return "Not Found";
  }
  return (
    <div className="mt-3 flex flex-col gap-5">
      <div className="border-b-2 pb-3 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-4xl font-bold">Settings</span>
          <span className="font-bold text-gray-500">
            Delete or update your product
          </span>
        </div>
        <AlertModal
          dialogTitle="Are u sure?"
          dialogDescription="This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers."
          submitHandler={submitHandler}
        >
          <Button variant="destructive" disabled={isLoading}>
            <Trash />
          </Button>
        </AlertModal>
      </div>
      <div className="flex flex-wrap gap-6 items-start justify-center">
        <Image
          src={currentProduct.image}
          alt={currentProduct.title}
          width={400}
          height={400}
          className="border-2 rounded-xl"
        />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 border-b-2 pb-2">
            <span className="text-3xl font-bold">{currentProduct.title}</span>
            <span className="text-xl font-bold">
              ${currentProduct.price}.00
            </span>
          </div>
          <div className="flex flex-col gap-2 pb-2 border-b-2 cursor-pointer">
            <span className="text-sm text-gray-500 max-w-[400px]">
              {currentProduct.description}
            </span>
          </div>
          <Button asChild className="sm:self-start" variant="outline">
            <Link href={`/admin/products/edit/${currentProduct.id}`}>
              Edit Product
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
