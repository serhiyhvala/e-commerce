import {NextResponse} from "next/server";
import prismaDb from "@/configs/prisma";
export const revalidate = 0
export async function GET(req: Request){
    try {
        const allOrders = await prismaDb.order.findMany({
            include: {
                products: true
            }
        })

        return NextResponse.json(allOrders)
    }catch (error){
        console.error(error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}