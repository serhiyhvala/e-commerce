import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { IProduct } from "@/types/product.types";
import prismaDb from "@/configs/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { description, image, title, price }: IProduct = await req.json();

    const newProduct = await prismaDb.product.create({
      data: {
        description,
        image,
        title,
        price: +price,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log("PRODUCT_POST", error);
    return new NextResponse("Internal Error");
  }
}
