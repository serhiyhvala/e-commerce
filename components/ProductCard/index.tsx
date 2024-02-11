import { FC, ReactNode, useState } from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import { cropText } from "@/utils/cropText";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { PinContainer } from "@/components/3DPin";

interface IProductCard extends Product {
  children: ReactNode;
  link: string;
  likeButton?: boolean;
}

const ProductCard: FC<IProductCard> = ({
  id,
  price,
  description,
  image,
  title,
  children,
  link,
  likeButton,
}) => {
  const [clicked, setClicked] = useState(false);
  const { userId, user } = useAuth();

  const handleLikeButton = async () => {
    try {
      setClicked(true);
      const { data } = await axios.post("/api/user/products", { userId, id });
      toast.success("Product added to your likes");
    } catch (error) {
      console.error(error);
      setClicked(false);
      toast.error("U need to be authorized!");
    }
  };

  const isProductLiked = !!user?.likedProducts.find((item) => item.id === id);

  return (
    <PinContainer title="/see-info" href={link}>
      <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="flex flex-1 w-full max-h-[200px] object-cover rounded-lg mt-4"
        />
        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
          {title}
        </h3>
        <div className="text-base !m-0 !p-0 font-normal">
          <span className="text-slate-500 ">{cropText(description, 50)}</span>
        </div>
      </div>
    </PinContainer>
  );
};

export default ProductCard;
