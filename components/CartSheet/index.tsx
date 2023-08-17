import {useStore} from "@/store/store";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ShoppingBasket} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CartSheet = () => {
    const {cart, removeItem} = useStore()
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='outline' className='flex items-center gap-2'>
                    <ShoppingBasket/>
                    <span className='font-bold text-lg'>{cart.length}</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Products</SheetTitle>
                    <SheetDescription>
                        Make changes to your cart here. Click checkout when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                {!cart.length ? (
                    <span className='font-bold h-full flex items-center justify-center'>You don&apos;t have any items in cart</span>
                ) : (
                    <>
                        <div className="grid gap-4 py-4">
                            {cart.map(item => (
                                <div className="grid grid-cols-2 items-start gap-4" key={item.id}>
                                    <Image src={item.image} alt={item.title} width={150} height={150} className='rounded-xl'/>
                                    <div className="flex flex-col gap-4">
                                        <span>{item.title}</span>
                                        <Button variant='destructive' onClick={() => removeItem(item.id)}>Remove</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit" asChild>
                                    <Link href='/order'>Checkout</Link>
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;