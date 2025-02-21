"use client"

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import PlaylistButton from "@/components/PlaylistButton";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SongSearchContentProps {
    songs: Song[];
    userId: string | undefined;
}

const SongSearchContent: React.FC<SongSearchContentProps> = ({
    songs,
    userId
}) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div
            className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
            "
            >
                <p>No songs found</p>
            </div>
        )
    }

    return (
        <div className="felx felx-col gap-y-2 w-ful px-6">
            {songs.map((song) => (
                <div
                key={song.id}
                className="flex items center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem 
                        onClick={(id: string) => {onPlay(id)}}
                        data={song}
                        isOwner={song.user_id === userId}
                        hasAlbumName={true}
                        />
                    </div>
                    <PlaylistButton songId={song.id}/>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}

export default SongSearchContent;