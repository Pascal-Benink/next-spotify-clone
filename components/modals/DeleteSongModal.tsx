"use client";

import Modal from "../Modal";
import { useEffect, useState } from "react";
import Button from "../Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useDeleteSongModal } from "@/hooks/useDeleteSongModal";

const DeleteSongModal = () => {
    const router = useRouter();
    const deleteSongModal = useDeleteSongModal();

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUser();

    const supabaseClient = useSupabaseClient();

    const songId = deleteSongModal.songId;

    const [songName, setSongtName] = useState(songId);

    const fetchSongName = async () => {
        try {
            const { data: song, error } = await supabaseClient
                .from('songs')
                .select('title')
                .eq('id', songId)
                .single();

            if (error) {
                console.error("Error fetching song name: ", error);
                toast.error("Failed to fetch song name");
                return;
            }

            setSongtName(song?.title);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        if (!songId) {
            return;
        }

        fetchSongName();
    }, [songId]);

    const onChange = (open: boolean) => {
        if (!open) {
            deleteSongModal.onClose();
        }
    }

    const DeleteSong = async () => {
        try {
            const { data, error: GetSongError } = await supabaseClient
                .from('songs')
                .select('*')
                .eq('id', songId)
                .eq('user_id', user?.id)
                .single();

            if (GetSongError || !data) {
                console.error("Error fetching song: ", GetSongError);
                toast.error("Failed to fetch song");
                return;
            }

            const { error: SongDeleteError } = await supabaseClient
                .from('songs')
                .delete()
                .eq('id', songId)
                .eq('user_id', user?.id)

            if (SongDeleteError) {
                console.error("Error deleting song: ", SongDeleteError);
                toast.error("Failed to delete song");
                return;
            }

            const { error: StorageDeleteError } = await supabaseClient
                .storage
                .from('songs')
                .remove([data.song_path]);

            if (StorageDeleteError) {
                console.error("Error deleting song from storage: ", StorageDeleteError);
                toast.error("Failed to delete song from storage");
                return;
            }

            const { data: playlists, error: PlaylistError } = await supabaseClient
                .from('playlists')
                .select('image_path')
                .eq('image_path', data.image_path);

            if (PlaylistError) {
                console.error("Error checking playlists: ", PlaylistError);
                toast.error("Failed to check playlists");
                return;
            }

            const { data: songImageDatas, error: SongImageError } = await supabaseClient
                .from('songs')
                .select('*')
                .eq('image_path', data.image_patch);

            if (SongImageError) {
                console.error("Error fetching song images: ", SongImageError);
                toast.error("Failed to fetch song images");
                return;
            }

            const { data: albumImageDatas, error: AlbumImageError } = await supabaseClient
                .from('albums')
                .select('*')
                .eq('image_patch', data.image_patch);

            if (AlbumImageError) {
                console.error("Error fetching song images: ", SongImageError);
                toast.error("Failed to fetch song images");
                return;
            }

            if (playlists.length === 0 && songImageDatas.length === 0 && albumImageDatas.length === 0) {
                const { error: ImageStorageDeleteError } = await supabaseClient
                    .storage
                    .from('images')
                    .remove([data.image_path]);

                if (ImageStorageDeleteError) {
                    console.error("Error deleting image from storage: ", ImageStorageDeleteError);
                    toast.error("Failed to delete image from storage");
                    return;
                }
            }

            toast.success("Song deleted successfully");
            router.push('/');
            deleteSongModal.onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title={`Delete Song ${songName}`}
            description=""
            isOpen={deleteSongModal.isOpen}
            onChange={onChange}
        >
            <form className="w-full flex flex-row justify-evenly items-center">
                <Button disabled={isLoading} onClick={DeleteSong} className="w-[170px]">
                    Delete Song
                </Button>
                <Button disabled={isLoading} onClick={() => {
                    deleteSongModal.onClose()
                }} className="bg-neutral-500 w-[170px]">
                    Cancel
                </Button>
            </form>
        </Modal >
    );
}

export default DeleteSongModal;