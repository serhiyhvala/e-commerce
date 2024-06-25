import prismaDb from "@/configs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    if (userId) {
      const isUserExists = await prismaDb.user.findUnique({
        where: {
          userId,
        },
        include: {
          likedProducts: true,
          orders: {
            include: {
              products: true,
            },
          },
        },
      });
      if (isUserExists) {
        return NextResponse.json(isUserExists);
      } else {
        const newUser = await prismaDb.user.create({
          data: {
            userId,
          },
        });
        return NextResponse.json(newUser);
      }
    } else {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
