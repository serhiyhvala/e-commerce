import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { IProduct } from "@/types/product.types";
import prismaDb from "@/configs/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  typescript: true,
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { description, image, title, price }: IProduct = await req.json();

    const response = await stripe.products.create({
      name: title,
      default_price_data: {
        currency: "uah",
        unit_amount: +price * 100,
      },
    })

    const newProduct = await prismaDb.product.create({
      data: {
        description,
        image,
        title,
        price: +price,
        priceId: response.id,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log("PRODUCT_POST", error);
    return new NextResponse("Internal Error");
  }
}
