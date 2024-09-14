/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import { handleVote } from "../actions";
import { DownVote, UpVote } from "./SubmitButtons";
import { RenderToJson } from "./RenderToJson";

interface iAppProps {
    title: string,
    jsonContent: any;
    id: string;
    subName: string;
    userName: string;
    imageString: string | null;
    voteCount: number;
}

export function PostCard({id, imageString, jsonContent, subName, title, userName, voteCount}: iAppProps){
    return (
        <Card className="flex relative overflow-hidden">
            <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="UP" />
                    <input type="hidden" name="postId" value={id} />
                    <UpVote />
                </form>
                {voteCount}
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="DOWN" />
                    <input type="hidden" name="postId" value={id} />
                    <DownVote />
                </form>
            </div>

            <div>
                <div className="flex items-center gap-x-2 p-2">
                    <Link href={`/r/${subName}`} className="font-semibold text-xs">r/{subName}</Link>
                    <p className="text-xs text-muted-foreground">Posted by: <span className="hover:text-primary">u/Sully</span></p>
                </div>

                <div className="px-2">
                    <Link href="/">
                        <h1 className="font-medium mt-1 text-lg">{title}</h1>
                    </Link>
                </div>
                
                <div className="max-h-[300px] overflow-hidden">
                    {imageString ? (
                        <Image
                            src={imageString}
                            alt="Post Image"
                            width={600}
                            height={300}
                            className="w-full h-full"
                        />
                    ): (
                        <RenderToJson data={jsonContent} />
                    )}                    
                </div>

                <div className="m-3 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-1">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground font-medium text-xs">31 comments</p>
                    </div>
                    <CopyLink id={id}/>
                </div>
            </div>
        </Card>
    )
}