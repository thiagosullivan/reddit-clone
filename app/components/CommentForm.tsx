"use client"

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButtons";
import { createComment } from "../actions";
import { useRef } from "react";

interface iAppProps{
    postId: string;
}

export function CommentForm({postId}: iAppProps){
    const ref = useRef<HTMLFormElement>(null);

    return (
        <form action={async(formData) => {
            await createComment(formData);
            ref.current?.reset()
        }} className="mt-5" ref={ref}>
            <input type="hidden" name="postId" value={postId}/>
            <Label>Comment right here</Label>
            <Textarea placeholder="What are your thoughts?" className="w-full mt-1 mb-2" name="comment"/>
            <SubmitButton text="Comment" />
        </form>
    )
}