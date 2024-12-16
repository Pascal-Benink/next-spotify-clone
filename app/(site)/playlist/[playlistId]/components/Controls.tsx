"use client";

import React, { useState, useEffect } from "react";
import ShuffleButton from "@/components/ShuffleButton";
import UsablePlayButton from "@/components/UsablePlayButton";
import PlaylistPopover from "@/components/PlaylistPopover";

interface ShuffleControlProps {
    songs: any[];
    isOwner: boolean;
}

const ShuffleControl: React.FC<ShuffleControlProps> = ({ songs, isOwner }) => {
    const [shuffle, setShuffle] = useState<boolean>(false);

    const handleShuffle = () => {
        setShuffle(!shuffle);
    }

    return (
        <div className="flex flex-row gap-x-3 ml-5 w-full items-center">
            <UsablePlayButton songs={songs} />
            <ShuffleButton doShuffle={shuffle} onShuffle={handleShuffle} size={30} />
            {isOwner && (
                <PlaylistPopover />
            )}
        </div>
    );
}

export default ShuffleControl;