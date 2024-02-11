import { useEffect, useState } from "react";
import { IOrder } from "@/types/user.types";

export const useGetAllOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const data = await fetch("/api/orders");
        setIsLoading(false);
        return data.json();
      } catch (error) {
        console.error(error);
      }
    };

    getAllOrders().then((data) => setOrders(data));
  }, []);

  return { isLoading, orders };
};
