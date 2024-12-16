"use client";

import React, { useState, useEffect } from "react";
import ShuffleButton from "@/components/ShuffleButton";
import UsablePlayButton from "@/components/UsablePlayButton";

interface ShuffleControlProps {
    songs: any[];
}

const ShuffleControl: React.FC<ShuffleControlProps> = ({ songs }) => {
    const [shuffle, setShuffle] = useState<boolean>(false);

    const handleShuffle = () => {
        setShuffle(!shuffle);
    }

    return (
        <div className="flex flex-row gap-x-3 ml-5 w-full">
            <UsablePlayButton songs={songs} />
            <ShuffleButton doShuffle={shuffle} onShuffle={handleShuffle} size={30} />
        </div>
    );
}

export default ShuffleControl;