/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma } from "@prisma/client";

export async function updateUsername(prevState: any, formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect('/api/auth/login')
    }

    const username = formData.get('username') as string;

    try {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                userName: username,
            },
        });
    
        return {
            message: 'Succesfully Update name',
            status: "green",
        }
    } catch (e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002'){
                return {
                    message: 'This username is already in use',
                    status: "error",
                }
            }
        }
    }
}