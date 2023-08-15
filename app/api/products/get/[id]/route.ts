import {NextResponse} from "next/server";
import prismaDb from "@/configs/prisma";

export async function GET(req: Request, {params}: {params: {id: string}}){
    try {
        const currentProduct = await prismaDb.product.findUnique({
            where: {
                id: params.id
            }
        })
        return NextResponse.json(currentProduct)
    } catch (error){
        return new NextResponse("Internal server error", {status: 500})
    }
}