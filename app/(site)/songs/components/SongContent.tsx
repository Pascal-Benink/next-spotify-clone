"use client"

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SongContentProps {
    songs: Song[];
    userId: string | undefined;
}

const SongContent: React.FC<SongContentProps> = ({
    songs,
    userId
}) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No Songs Available
            </div>
        )
    }
    return (
        <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lx:grid-cols-5 2xl:grid-cols-8 gap-4 ml-4"
        >
            {songs.map((item) => (
                <SongItem
                    key={item.id}
                    onClick={(id: string) => { onPlay(id) }}
                    data={item}
                    isOwner={item.user_id === userId}
                />
            ))}
        </div>
    );
}

export default SongContent;