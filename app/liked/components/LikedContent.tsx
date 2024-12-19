"use client"

import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
    songs: Song[];
    userId: string | undefined;
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs,
    userId
}) => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    if (songs.length === 0) {
        return (
            <div className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
            ">
                No Liked Songs.
            </div>
        )
    }

    return ( 
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.map((song) => (
                <div
                key={song.id}
                className="flex items-center gap-x-4 wq-full"
                >
                    <div className="flex-1">
                        <MediaItem 
                        onClick={(id: string) => {onPlay(id)}}
                        data={song}
                        isOwner={song.user_id === userId}
                        />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
     );
}
 
export default LikedContent;