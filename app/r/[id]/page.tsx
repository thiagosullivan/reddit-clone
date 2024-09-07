import { SubDescriptionForm } from "@/app/components/SubDescriptionForm";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(name: string){
    const data = await prisma.subreddit.findUnique({
        where: {
            name: name,
        },
        select: {
            name: true,
            createdAt: true,
            description: true,
            userId: true,            
        },
    });
    
    return data
}

export default async function SubredditRoute({params}: {params: {id: string}}){
    const data = await getData(params.id);
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return (
        <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
            <div className="w-[65%] flex flex-col gap-y-5">
                <h1>Hello from the post section</h1>
            </div>

            <div className="w-[35%]">
                <Card>
                    <div className="bg-muted p-4 font-semibold">About Community</div>
                    <div className="p-4">
                        <div className="flex items-center gap-x-3">
                            <Image
                                src={`https://avatar.vercel.sh/${data?.name}`}
                                alt="Image of subreddit"
                                width={60}
                                height={60}
                                className="rounded-full h-16 w-16"
                            />
                            <Link href={`/r/${data?.name}`} className="font-medium">r/{data?.name}</Link>
                        </div>
                        {user?.id === data?.userId ? (
                            <SubDescriptionForm subName={params.id} description={data?.description}/>
                        ) : (
                            <p className="text-sm font-normal text-secondary-foreground mt-2">{data?.description}</p>
                        )}

                        <div className="flex items-center gap-x-2 mt-4">
                            <Cake className="h-5 w-5 text-muted-foreground" />
                            <p className="text-muted-foreground font-medium text-sm">Created: {new Date(data?.createdAt as Date).toLocaleDateString('en-us', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}</p>
                        </div>

                        <Separator className="my-5" />
                        <Button asChild className="rounded-full w-full">
                            <Link href={user?.id ? `/r/${data?.name}/create` : '/api/auth/login'}>Create Post</Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}