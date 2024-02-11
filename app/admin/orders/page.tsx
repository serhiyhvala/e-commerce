"use client";
import { useGetAllOrders } from "@/hooks/useGetAllOrders";
import Loading from "@/components/Loading";
import OrderItem from "@/components/OrderItem";

const OrdersPage = () => {
  const { orders, isLoading } = useGetAllOrders();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-3 flex flex-col gap-3">
      <div className="border-b-2 pb-3 flex flex-col">
        <span className="text-4xl font-bold">All Orders</span>
        <span className="font-bold text-gray-500">See all orders</span>
      </div>
      <div className="flex flex-wrap gap-3 items-start justify-center">
        {orders.map((item) => (
          <OrderItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
