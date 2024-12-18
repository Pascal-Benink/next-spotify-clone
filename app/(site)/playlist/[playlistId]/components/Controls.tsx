"use client";

import React from "react";
import ShuffleButton from "@/components/ShuffleButton";
import UsablePlayButton from "@/components/UsablePlayButton";
import PlaylistPopover from "@/components/PlaylistPopover";
import { Song } from "@/types";

interface ShuffleControlProps {
    playlistId: string;
    songs: Song[];
    isOwner: boolean;
}

const ShuffleControl: React.FC<ShuffleControlProps> = ({ playlistId, songs, isOwner }) => {

    return (
        <div className="flex flex-row gap-x-3 ml-5 w-full items-center">
            <UsablePlayButton songs={songs} />
            <ShuffleButton size={30} />
            {isOwner && (
                <PlaylistPopover playlistId={playlistId} />
            )}
        </div>
    );
}

export default ShuffleControl;