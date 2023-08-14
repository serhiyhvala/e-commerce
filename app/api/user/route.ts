import {auth} from "@clerk/nextjs";
import prismaDb from "@/configs/prisma";
import {NextResponse} from "next/server";

export async function GET(){
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        const isUserExists = await prismaDb.user.findUnique({
            where: {
                userId
            }
        })
        if(isUserExists){
            return NextResponse.json(isUserExists)
        } else {
            const newUser =  await prismaDb.user.create({
                data: {
                    userId
                }
            })
            return NextResponse.json(newUser)
        }
    } catch (error){
        console.error(error)
    }
}