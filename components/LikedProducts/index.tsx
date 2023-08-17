import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {Expand, ShoppingCart} from "lucide-react";
import {useAuth} from "@/hooks/useAuth";
import {useStore} from "@/store/store";

const LikedProducts = () => {
    const {user} = useAuth()
    const {handleAddItemToCart} = useStore()
    return (
        <>
            <span className='text-4xl font-bold pb-5 border-b-2 flex items-start'>Liked Products</span>
            <div className="flex items-center justify-center gap-5 flex-wrap">
                {user?.likedProducts.length ? (
                    user.likedProducts.map(item => (
                        <ProductCard key={item.id} {...item} link={`/products/${item.id}`} likeButton>
                            <>
                                <Link href={`/products/${item.id}`}
                                      className='rounded-full bg-black p-3 flex justify-center'>
                                    <Expand className='text-white'/>
                                </Link>
                                <span className='rounded-full bg-black p-3 flex justify-center cursor-pointer'>
                                    <ShoppingCart className='text-white' onClick={() => handleAddItemToCart(item)}/>
                                </span>
                            </>
                        </ProductCard>
                    ))
                ) : <span className='text-5xl font-bold'>You don&apos;t have any liked products</span>}
            </div>
        </>
    );
};

export default LikedProducts;