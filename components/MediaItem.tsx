"use client";

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {
    const imageUrl = useLoadImage(data);

    const songId = data.id;
    const { activateId } = usePlayer();

    const playing = songId === activateId;

    const handleClick = () => {
        if (onClick) {
            onClick(data.id);
        }

        // TODO: defould turn on player
    }

    return ( 
        <div
        onClick={handleClick}
        className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/50
        w-full
        p-2
        rounded-md
        "
        >
            <div
            className="
            relative
            rounded-md
            min-h-[48px]
            min-w-[48px]

            "
            >
                <Image 
                fill
                src={imageUrl || "/images/liked.png"}   
                alt="mediaItem"
                className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className={twMerge("text-white truncate", playing && "text-green-500")}>{data.title}</p>
                <p className="text-neutral-400 text-sm truncate">{data.author}</p>
            </div>
        </div>
     );
}
 
export default MediaItem;