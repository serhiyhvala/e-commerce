import {Product} from "@prisma/client";

export interface IOrder{
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    fullName: string
    email: string
    totalPrice: number
    address: string
    products: Product[]
}

export interface User {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    isAdmin: boolean
    likedProducts: Product[]
    orders: IOrder[]
}