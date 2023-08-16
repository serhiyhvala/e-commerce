'use client'

import DataTable from "@/components/DataTable";
import {useGetAllProducts} from "@/hooks/useGetAllProducts";
import {cropText} from "@/utils/cropText";
import {IProductsColumns, productsColumns} from "@/data/productsColumns.data";

const Admin = () => {
    const {products} = useGetAllProducts()
    const dataProducts: IProductsColumns[] = products.map(item => ({
        title: item.title,
        description: cropText(item.description, 100),
        price: item.price,
        createdAt: new Date(item.cretedAt).toLocaleDateString('en-US')
    }))

    return (
        <div className='mt-3 flex flex-col gap-3'>
            <div
                className="border-b-2 pb-3 flex items-center justify-center flex-col sm:flex-row sm:justify-between flex-wrap">
                <div className="flex flex-col">
                    <span className='text-4xl font-bold'>Dashboard</span>
                    <span className='font-bold text-gray-500'>See full info about store</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-2 items-center border-2 p-2 rounded-xl">
                        <span className='text-lg'>Total Products</span>
                        <span className='text-xl font-bold'>{products.length}</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center border-2 p-2 rounded-xl">
                        <span className='text-lg'>Total Orders</span>
                        <span className='text-xl font-bold'>0</span>
                    </div>
                </div>
            </div>
            <span className='text-3xl font-bold'>Products</span>
            <DataTable columns={productsColumns} data={dataProducts}/>
        </div>
    );
};

export default Admin;
