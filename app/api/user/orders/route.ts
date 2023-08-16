import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import prismaDb from "@/configs/prisma";
import {Product} from "@prisma/client";

interface IRequest {
    cart: Product[],
    fullName: string,
    address: string,
    email: string,
    totalPrice: number
}

export async function POST(req: Request) {
    try {
        const {userId} = auth()
        const {cart, fullName, address, email, totalPrice}: IRequest = await req.json()
        if (!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const order = await prismaDb.order.create({
            data: {
                fullName,
                address,
                email,
                totalPrice,
                products: {
                    connect: cart.map(item => ({id: item.id}))
                },
            },
            include: {
                products: true
            }
        })

        await prismaDb.user.update({
            where: {
                userId
            },
            data: {
                orders: {
                    connect: {
                        id: order.id
                    }
                }
            }
        })

        return NextResponse.json(order)
    } catch (error) {
        console.error(error)
        return new NextResponse('Bad request exception', {status: 500})
    }
}