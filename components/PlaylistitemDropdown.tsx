"use client";

import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AiOutlinePlus, AiOutlineUp } from "react-icons/ai";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUploadModal } from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { useCreatePlaylistModal } from "@/hooks/useCreatePlaylistModal";
import { BiTrash } from "react-icons/bi";
import PlaylistButton from "./PlaylistButton";
import { FaEllipsisH } from "react-icons/fa";

interface PlaylistItemDropdownProps {
    songId: string;
    playlistId: string;
}

const PlaylistItemDropdown = ({ songId, playlistId }: PlaylistItemDropdownProps) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const createPlaylistModal = useCreatePlaylistModal();

    const { user } = useUser();

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const ClickRemovefromPlaylist = () => {
        if (!user) {
            return authModal.onOpen();
        }

        return uploadModal.onOpen();
    }

    const ClickNewPlaylist = () => {
        if (!user) {
            return authModal.onOpen();
        }

        return createPlaylistModal.onOpen();
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="focus:outline-none" aria-label="Customise options">
                    <FaEllipsisH
                        size={20}
                        onClick={handleToggle}
                        className={`text-neutral-400 cursor-pointer hover:text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="py-2 min-w-[220px] rounded-md bg-neutral-900 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                    sideOffset={5}
                >
                    <DropdownMenu.Item
                        className="flex flex-row justify-between cursor-pointer focus:outline-none hover:text-white px-3"
                        onClick={ClickRemovefromPlaylist}
                    >
                        Remove From Playlist <BiTrash size={20} className="text-neutral-400" />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="flex flex-row justify-end cursor-pointer focus:outline-none hover:text-white px-3">
                        <PlaylistButton songId={songId} color="#9CA3AF"/>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default PlaylistItemDropdown;