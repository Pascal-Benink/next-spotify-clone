"use client"

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSong from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContect";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activateId);

    const songUrl = useLoadSong(song!);

    if (!song || !songUrl || !player.activateId) {
        return null;
    }

    return (
        <div
            className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[80px]
        px-4
        "
        >
            <PlayerContent
                key={songUrl}
                song={song}
                songUrl={songUrl}
            />
        </div>
    );
}

export default Player;