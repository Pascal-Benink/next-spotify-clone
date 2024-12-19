"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { FaEllipsisH } from "react-icons/fa"; import { HiOutlineTrash } from "react-icons/hi"; import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDeletePlaylistModal } from "@/hooks/useDeletePlaylistModal";

interface PlaylistPopoverProps {
    playlistId: string;
}

const PlaylistPopover: React.FC<PlaylistPopoverProps> = ({ playlistId }) => {
    const deletePlaylistModal = useDeletePlaylistModal();

    const handleDeletePlaylist = async () => {
        // const { error: PlaylistSongDeleteError } = await supabaseClient
        //     .from('playlist_songs')
        //     .delete()
        //     .eq('playlist_id', playlistId)
        //     .eq('user_id', user?.id)

        // if (PlaylistSongDeleteError) {
        //     console.error("Error deleting playlist songs: ", PlaylistSongDeleteError);
        //     toast.error("Failed to delete playlist songs");
        //     return;
        // }

        // const { error: PlaylistDeleteError } = await supabaseClient
        //     .from('playlists')
        //     .delete()
        //     .eq('id', playlistId)
        //     .eq('user_id', user?.id)

        // if (PlaylistDeleteError) {
        //     console.error("Error deleting playlist: ", PlaylistDeleteError);
        //     toast.error("Failed to delete playlist");
        //     return;
        // }
        // toast.success("Playlist deleted successfully");
        // return router.push('/');
        console.log("Delete Playlist");
        deletePlaylistModal.onOpen(playlistId);
    }

    return (
        <div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className="flex flex-col justify-center">
                        <FaEllipsisH className="text-neutral-400 hover:text-neutral-300 transition hover:outline-none" size={25} />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="py-2 min-w-[220px] rounded-md bg-neutral-800 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                    >
                        <DropdownMenu.Item className="flex flex-row justify-between cursor-pointer focus:outline-none text-neutral-400 hover:text-neutral-300 px-3 transition" onClick={handleDeletePlaylist}>
                            Delete Playlist <HiOutlineTrash size={20} className="text-neutral-400" />
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
}

export default PlaylistPopover;