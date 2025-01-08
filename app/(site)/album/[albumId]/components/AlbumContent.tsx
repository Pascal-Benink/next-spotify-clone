"use client"

import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import Link from "next/link";
import AlbumItemDropdown from "@/components/AlbumitemDropdown";

interface AlbumContentProps {
    songs: Song[];
    AlbumId: string;
    isOwner: boolean;
    userId: string | undefined;
}

const AlbumContent: React.FC<AlbumContentProps> = ({
    songs,
    AlbumId,
    isOwner,
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
                <p className="flex flex-row">
                    No Songs In this Playist. You can add them<Link href={"/search"} className="hover:underline ml-[0.3rem]">
                        here
                    </Link>
                </p>
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
                            onClick={(id: string) => { onPlay(id) }}
                            data={song}
                            isOwner={song.user_id === userId}
                        />
                    </div>
                    <AlbumItemDropdown songId={song.id} albumId={AlbumId} isOwner={isOwner} />
                    {/* <AlbumButton songId={song.id} /> */}
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}

export default AlbumContent;