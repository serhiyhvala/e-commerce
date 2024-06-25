import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismaDb from "@/configs/prisma";
import { Product } from "@prisma/client";
import Stripe from "stripe";
import {loadStripe} from "@stripe/stripe-js";

interface IRequest {
  cart: Product[];
  fullName: string;
  address: string;
  email: string;
  totalPrice: number;
}


const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  typescript: true,
  apiVersion: "2024-06-20",
});

export async function POST(req: Request, res: Response) {
  try {
    // @ts-ignore
    const { userId } = getAuth(req);
    const { cart, fullName, address, email, totalPrice }: IRequest = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const order = await prismaDb.order.create({
      data: {
        fullName,
        address,
        email,
        totalPrice,
        products: {
          connect: cart.map((item) => ({ id: item.id })),
        },
      },
      include: {
        products: true,
      },
    });

    await prismaDb.user.update({
      where: {
        userId,
      },
      data: {
        orders: {
          connect: {
            id: order.id,
          },
        },
      },
    });

    const lineItems = cart.map((item) => ({
      price: item.priceId,
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${new URL(req.url).origin}/?status=true`,
      cancel_url: `${new URL(req.url).origin}/?status=false`,
    });

    return NextResponse.json({url: session.url});
  } catch (error) {
    console.error(error);
    return new NextResponse("Bad request exception", { status: 500 });
  }
}
