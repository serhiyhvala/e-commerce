import { useAuth } from "@/hooks/useAuth";
import OrderItem from "@/components/OrderItem";

const Orders = () => {
  const { user } = useAuth();
  return (
    <>
      <span className="text-4xl font-bold pb-5 border-b-2 flex items-start">
        Orders
      </span>
      <div className="flex items-center justify-center gap-5 flex-wrap">
        {user?.orders.length ? (
          user.orders.map((item) => <OrderItem key={item.id} {...item} />)
        ) : (
          <span className="text-5xl font-bold">
            You don&apos;t have any orders yet
          </span>
        )}
      </div>
    </>
  );
};

export default Orders;
