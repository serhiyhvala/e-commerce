import {auth} from "@clerk/nextjs";
import prismaDb from "@/configs/prisma";
import {NextResponse} from "next/server";
import {Product} from "@prisma/client";

export async function GET(req: Request){
    try {
        const allProducts = await prismaDb.product.findMany({})

        return NextResponse.json(allProducts)

    } catch(error){
        console.log('PRODUCT_POST', error)
        return new NextResponse("Internal Error")
    }
}

export async function POST(req: Request){
    try {
        const {userId} = auth()
        const {description, image, title, price}: Product = await req.json()
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const newProduct = await prismaDb.product.create({
            data: {
                description,
                image,
                price: +price,
                title
            }
        })

        return NextResponse.json(newProduct)

    } catch(error){
        console.log('PRODUCT_POST', error)
        return new NextResponse("Internal Error")
    }
}