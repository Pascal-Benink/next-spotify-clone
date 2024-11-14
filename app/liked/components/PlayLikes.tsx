"use client"

import getLikedSongs from "@/actions/getLikedSongs";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import { FaPlay } from "react-icons/fa";

interface PlayLikesProps {
    songs: Song[];
}

const PlayLikes: React.FC<PlayLikesProps> = async ({
    songs
}) => {
    const playLiked = () => {
        const onPlay = useOnPlay(songs);

        onPlay(songs[0].id);
    }

    return (
        <button
            className="transition rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110" onClick={playLiked}>
            <FaPlay className="text-black" />
        </button>
    );
}

export default PlayLikes;