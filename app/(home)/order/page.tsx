"use client";
import { useStore } from "@/store/store";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const { cart, removeAll, removeItem } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const router = useRouter();

  const totalPrice = cart.reduce((a, b) => a + b.price, 0);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.id]: event.target.value });
  };

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/user/orders", {
        cart,
        ...input,
        totalPrice,
      });
      console.log(data);
      setIsLoading(false);
      router.push("/");
      removeAll();
      toast.success("Order created successfully");
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <section className="max-w-6xl mx-auto w-full px-3 py-5">
      {!cart.length ? (
        <span className="text-4xl font-bold h-screen flex items-center justify-center">
          You don&apos;t have any items in cart
        </span>
      ) : (
        <div className="flex flex-col gap-10">
          {cart.length > 1 ? (
            <div className="flex justify-between flex-wrap items-center gap-2">
              <span className="text-2xl font-bold">Shopping Cart</span>
              <Button
                onClick={removeAll}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <span className="sm:block hidden">Remove All Items</span>
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <span className="text-2xl font-bold">Shopping Cart</span>
          )}
          <div className="flex flex-col gap-5">
            {cart.map((item) => (
              <div
                className="flex sm:items-start items-center gap-5 flex-wrap sm:flex-row flex-col pb-5 border-b-2"
                key={item.id}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="rounded-xl border-2"
                />
                <div className="flex flex-col sm:items-start items-center">
                  <span className="sm:text-xl font-bold">{item.title}</span>
                  <span className="text-lg font-bold">${item.price}</span>
                  <Button onClick={() => removeItem(item.id)}>
                    Remove From Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col max-w-[400px] w-full self-center gap-3 border-2 rounded-lg p-5">
            <span className="pb-5 border-b-2 font-bold text-2xl">
              Order summary
            </span>
            <div className="flex justify-between items-center">
              <span className="font-bold">Order total</span>
              <span className="font-bold">${totalPrice}</span>
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmitForm}>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={input.fullName}
                  onChange={handleChangeInput}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={input.email}
                  onChange={handleChangeInput}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={input.address}
                  onChange={handleChangeInput}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                Checkout
              </Button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
