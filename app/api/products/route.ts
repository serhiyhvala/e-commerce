import {auth} from "@clerk/nextjs";
import prismaDb from "@/configs/prisma";
import {NextResponse} from "next/server";
import {IProduct} from "@/types/product.types";

export async function GET(req: Request){
    try {
        const allProducts = await prismaDb.product.findMany({})

        return NextResponse.json(allProducts)

    } catch(error){
        console.log('PRODUCT_POST', error)
        return new NextResponse("Internal Error")
    }
}