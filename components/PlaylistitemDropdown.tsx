"use client";

import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { BiTrash } from "react-icons/bi";
import PlaylistButton from "./PlaylistButton";
import { FaEllipsisH } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface PlaylistItemDropdownProps {
    songId: string;
    playlistId: string;
    isOwner: boolean;
}

const PlaylistItemDropdown = ({ songId, playlistId, isOwner }: PlaylistItemDropdownProps) => {
    const authModal = useAuthModal();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { user } = useUser();

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const ClickRemovefromPlaylist = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        const { error } = await supabaseClient
        .from('playlist_songs')
        .delete()
        .eq('song_id', songId)
        .eq('playlist_id', playlistId)
        .eq('user_id', user.id);

        if (error) {
            toast.error("Failed to remove song from playlist");
            console.error("Error removing song from playlist:", error);
        } else {
            toast.success("Song removed from playlist");
            router.refresh()
        }
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
                    {isOwner && (
                        <DropdownMenu.Item
                            className="flex flex-row justify-between cursor-pointer focus:outline-none hover:text-white px-3"
                            onClick={ClickRemovefromPlaylist}
                        >
                            Remove From Playlist <BiTrash size={20} className="text-neutral-400" />
                        </DropdownMenu.Item>
                    )}
                    <DropdownMenu.Item className="flex flex-row justify-between cursor-pointer focus:outline-none hover:text-white px-3">
                        Add to playlist <PlaylistButton songId={songId} color="#9CA3AF" />
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default PlaylistItemDropdown;