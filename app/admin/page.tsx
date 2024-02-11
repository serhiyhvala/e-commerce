"use client";

import DataTable from "@/components/DataTable";
import { useGetAllProducts } from "@/hooks/useGetAllProducts";
import { cropText } from "@/utils/cropText";
import { IProductsColumns, productsColumns } from "@/data/productsColumns.data";
import { IOrderColumns, ordersColumns } from "@/data/ordersColumns.data";
import { useGetAllOrders } from "@/hooks/useGetAllOrders";

const Admin = () => {
  const { products } = useGetAllProducts();
  const { orders } = useGetAllOrders();
  const dataOrders: IOrderColumns[] = orders.map((item) => ({
    fullName: item.fullName,
    email: item.email,
    userId: item.userId,
    address: item.address,
    totalPrice: item.totalPrice,
    cretedAt: new Date(item.cretedAt).toLocaleDateString("en-US"),
  }));

  const dataProducts: IProductsColumns[] = products.map((item) => ({
    title: item.title,
    description: cropText(item.description, 100),
    price: item.price,
    createdAt: new Date(item.cretedAt).toLocaleDateString("en-US"),
  }));
  const totalOrdersPrice = orders.reduce((a, b) => a + b.totalPrice, 0);
  return (
    <div className="mt-3 flex flex-col gap-3">
      <div className="border-b-2 pb-3 flex items-center justify-center flex-col sm:flex-row sm:justify-between flex-wrap">
        <div className="flex flex-col">
          <span className="text-4xl font-bold">Dashboard</span>
          <span className="font-bold text-gray-500">
            See full info about store
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-2 items-center border-2 p-2 rounded-xl">
            <span className="text-lg">Total Products</span>
            <span className="text-xl font-bold">{products.length}</span>
          </div>
          <div className="flex flex-col gap-2 items-center border-2 p-2 rounded-xl">
            <span className="text-lg">Total Orders</span>
            <span className="text-xl font-bold">{orders.length}</span>
          </div>
          <div className="flex flex-col gap-2 items-center border-2 p-2 rounded-xl">
            <span className="text-lg">Total sells</span>
            <span className="text-xl font-bold">${totalOrdersPrice}</span>
          </div>
        </div>
      </div>
      <span className="text-3xl font-bold">Products</span>
      <DataTable columns={productsColumns} data={dataProducts} />
      <span className="text-3xl font-bold">Orders</span>
      <DataTable columns={ordersColumns} data={dataOrders} />
    </div>
  );
};

export default Admin;
