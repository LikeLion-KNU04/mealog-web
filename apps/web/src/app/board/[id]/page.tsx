"use client"

import Comment from "@/components/Comment";
import MainLayout from "@/components/MainLayout";
import Nutrient from "@/components/Nutrient";
import { IconBookmark, IconChevronLeft, IconChevronRight, IconHeart, IconShare } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export default function BoardDetailPage(){
    const imageLength = 5;
    const [index, setIndex] = useState(0);
    const moveIndex = (offset: number) => {
        if(0 <= (index + offset) && (index + offset)  < imageLength)
            setIndex(index + offset);
        else if(0 > (index + offset))
            setIndex(0);
        else
            setIndex(imageLength-1);
    }
    return (
        <MainLayout>
            <div className="flex items-start gap-5 px-32 py-16">
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => {moveIndex(-1)}}
                    >
                        <IconChevronLeft/>
                    </button>
                    <div className="flex flex-row overflow-hidden" style={{width: 512}}>
                        
                        <div className="flex"
                            style={{
                                transform: `translateX(-${index * 512}px)`,
                                transition: "ease-in-out 250ms"
                            }}
                        >
                        <Image
                            src="https://picsum.photos/id/1/512/512"
                            alt="board Iamge 1"
                            width={512}
                            height={512}
                        />
                        <Image
                            src="https://picsum.photos/id/2/512/512"
                            alt="board Iamge 1"
                            width={512}
                            height={512}
                        />
                        <Image
                            src="https://picsum.photos/id/3/512/512"
                            alt="board Iamge 1"
                            width={512}
                            height={512}
                        />
                        <Image
                            src="https://picsum.photos/id/4/512/512"
                            alt="board Iamge 1"
                            width={512}
                            height={512}
                        />
                        <Image
                            src="https://picsum.photos/id/5/512/512"
                            alt="board Iamge 1"
                            width={512}
                            height={512}
                        />
                        </div>
                        
                    </div>
                    <button
                        type="button"
                        onClick={() => {moveIndex(1)}}
                    >
                            <IconChevronRight/>
                    </button>
                </div>
                <div className="flex flex-col flex-grow gap-6 p-6 shadow-2xl shadow-black/10">
                    <div className="flex items-center gap-3">
                        <Image
                            className="rounded-full"
                            alt="profile Image"
                            src="https://picsum.photos/200/200"
                            width={32}
                            height={32}
                        />
                        <div className="text-xl">
                            username
                        </div>
                        <div className="text-base text-gray-500">
                            1일전
                        </div>
                    </div>
                    <div className="text-base">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <div>
                        <Nutrient carbs={100} protein={100} fat={100}/>
                    </div>
                    <div className="flex flex-row py-5 border rounded-lg justify-evenly ">
                        <button
                            type="button"
                        >
                            <IconHeart/>
                        </button>
                        <button
                            type="button"
                        >
                            <IconBookmark/>
                        </button>
                        <button
                            type="button"
                        >
                            <IconShare />
                        </button>
                    </div>
                    <div className="text-xl">
                        댓글 3개
                    </div>
                    <div className="flex flex-col gap-5">
                        <Comment
                            profileImage="https://picsum.photos/200/200"
                            username="username"
                            content="댓글입니다."
                        />
                        <Comment
                            profileImage="https://picsum.photos/200/200"
                            username="username"
                            content="댓글입니다."
                        />
                        <Comment
                            profileImage="https://picsum.photos/200/200"
                            username="username"
                            content="댓글입니다."
                        />
                        
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}