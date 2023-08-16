import {Product} from "@prisma/client";

export interface User {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    isAdmin: boolean
    likedProducts: Product[]
}