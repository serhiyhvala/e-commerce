import prismaDb from "@/configs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, id } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await prismaDb.user.update({
      where: {
        userId,
      },
      data: {
        likedProducts: {
          connect: {
            id,
          },
        },
      },
      include: {
        likedProducts: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
  }
}
