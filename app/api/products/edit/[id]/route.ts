import { auth } from "@clerk/nextjs/server";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";
import prismaDb from "@/configs/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = auth();
    const { description, image, title, price }: Product = await req.json();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const updatedProduct = await prismaDb.product.updateMany({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        image,
        price: +price,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    await prismaDb.product.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json("Product deleted successfully");
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
