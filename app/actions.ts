/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

        throw e;
    }
}

export async function createCommunity(prevState: any, formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/api/auth/login")
    }

    try {
        const name = formData.get('name') as string;

        const data = await prisma.subreddit.create({
            data: {
                name: name,
                userId: user.id,
            },
        });

        return redirect("/")
    } catch (e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002'){
                return {
                    message: 'This name is already in use',
                    status: "error",
                }
            }
        }

        throw e;
    }
}

export async function updateSubDescription(prevState: any, formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/api/auth/login")
    }

    try {
        const subName = formData.get('subName') as string;
        const description = formData.get('description') as string;

        await prisma.subreddit.update({
            where: {
                name: subName,
            },
            data: {
                description: description,
            }
        })

        return {
            message: 'Succesfully update description!',
            status: "green",
        }
        
    } catch (e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError){
            if(e.code === 'P2002'){
                return {
                    message: 'This name is already in use',
                    status: "error",
                }
            }
        }

        throw e;
    }
}