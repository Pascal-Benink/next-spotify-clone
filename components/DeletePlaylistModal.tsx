"use client";

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import CheckBox from "./CheckBox";
import { useDeletePlaylistModal } from "@/hooks/useDeletePlaylistModal";

const DeletePlaylistModal = () => {
    const router = useRouter();
    const deletePlaylistModal = useDeletePlaylistModal();

    const [isLoading, setIsLoading] = useState(false);
    
    const { user } = useUser();
    
    const supabaseClient = useSupabaseClient();
    
    const { playlistId } = deletePlaylistModal;

    const onChange = (open: boolean) => {
        if (!open) {
            deletePlaylistModal.onClose();
        }
    }

    const DeletePlaylist = async () => {
        try {
            const { error: PlaylistSongDeleteError } = await supabaseClient
                .from('playlist_songs')
                .delete()
                .eq('playlist_id', playlistId)
                .eq('user_id', user?.id)

            if (PlaylistSongDeleteError) {
                console.error("Error deleting playlist songs: ", PlaylistSongDeleteError);
                toast.error("Failed to delete playlist songs");
                return;
            }

            const { error: PlaylistDeleteError } = await supabaseClient
                .from('playlists')
                .delete()
                .eq('id', playlistId)
                .eq('user_id', user?.id)

            if (PlaylistDeleteError) {
                console.error("Error deleting playlist: ", PlaylistDeleteError);
                toast.error("Failed to delete playlist");
                return;
            }
            toast.success("Playlist deleted successfully");
            router.push('/');
            deletePlaylistModal.onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Delete Playlist"
            description="Delete a new playlist"
            isOpen={deletePlaylistModal.isOpen}
            onChange={onChange}
        >
            <div className="w-full flex flex-row">

            <Button disabled={isLoading} onClick={DeletePlaylist}>
                Delete Playlist
            </Button>
            <Button disabled={isLoading} onClick={() => deletePlaylistModal.onClose()} color="secondary">
                Cancel
            </Button>
            </div>
        </Modal >
    );
}

export default DeletePlaylistModal;