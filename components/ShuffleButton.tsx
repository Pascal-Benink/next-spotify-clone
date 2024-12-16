"use client"

import { useState } from "react";
import { LuShuffle } from "react-icons/lu";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";

interface ShuffleButtonProps {
    doShuffle: boolean;
    size?: number;
}

const ShuffleButton: React.FC<ShuffleButtonProps> = ({
    doShuffle,
    size
}) => {
    const [shuffle, setShuffle] = useState<boolean>(doShuffle);

    const Icon = LuShuffle;

    const handleShuffle = async () => {
        setShuffle(!shuffle);
    }

    return (
        <button
            onClick={handleShuffle}
            className="
        hover:opacity-75
        transition
        "
        >
            <Icon color={shuffle ? '#22c55e' : 'white'} size={size || 25} />
        </button>
    );
}

export default ShuffleButton;