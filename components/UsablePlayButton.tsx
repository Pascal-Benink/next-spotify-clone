"use client"
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import { FaPlay } from "react-icons/fa";

interface UsablePlayButtonProps {
    songs: Song[];
}

const UsablePlayButton: React.FC<UsablePlayButtonProps> = ({songs}) => {
    const onPlay = useOnPlay(songs);

    return (
        <button
            className="
        transition 
        opacity-0
        rounded-full
        flex
        items-center
        bg-green-500
        p-4
        drop-shadow-md
        translate
        translate-y-1/4
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:scale-110
        "
            onClick={() => onPlay(songs[0].id)}
        >
            <FaPlay className="text-black" />
        </button>
    );
}

export default UsablePlayButton;