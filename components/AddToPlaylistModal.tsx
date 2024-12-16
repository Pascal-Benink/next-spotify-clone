"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useAddToPlaylistModal } from "@/hooks/useAddToPlaylistModal";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import CheckBox from "./CheckBox";
import { Playlist } from "@/types";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useCreatePlaylistModal } from "@/hooks/useCreatePlaylistModal";

const AddToPlaylistModal = () => {
    // const subscribeModal = useSubscribeModal();
    // const authModal = useAuthModal();
    // const createPlaylistModal = useCreatePlaylistModal();
    const router = useRouter();
    const addToPlaylistModal = useAddToPlaylistModal();
    const { user } = useUser();
    const { handleSubmit } = useForm();
    const supabaseClient = useSupabaseClient();

    const [isLoading, setIsLoading] = useState(false);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

    const songId = addToPlaylistModal.songId;

    useEffect(() => {
        const fetchPlaylists = async () => {
            if (user) {
                const { data, error } = await supabaseClient
                    .from('playlists')
                    .select('*')
                    .eq('user_id', user.id);

                if (error) {
                    toast.error("Failed to fetch playlists");
                } else {
                    setPlaylists(data);
                }
            }
        };

        fetchPlaylists();
    }, [user, supabaseClient]);

    const onChange = (open: boolean) => {
        if (!open) {
            setSelectedPlaylists([]);
            addToPlaylistModal.onClose();
        }
    };

    const handleCheckboxChange = (playlistId: string) => {
        setSelectedPlaylists((prev) => {
            if (prev.includes(playlistId)) {
                return prev.filter((id: string) => id !== playlistId);
            } else {
                return [...prev, playlistId];
            }
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        console.log("Added songId ", songId, "to Playlist", selectedPlaylists);
        try {
            setIsLoading(true);

            if (selectedPlaylists.length === 0) {
                toast.error("Please select at least one playlist");
                return;
            }

            if (!user) {
                toast.error("Please login to add songs to playlist");
                return;
            }

            const insertPromises = selectedPlaylists.map(playlistId => {
                return supabaseClient
                    .from('playlist_songs')
                    .insert({
                        user_id: user.id,
                        playlist_id: playlistId,
                        song_id: addToPlaylistModal.songId, // Use songId from hook
                    });
            });

            const results = await Promise.all(insertPromises);

            const hasError = results.some(result => result.error);
            if (hasError) {
                toast.error("Failed to add song to playlists");
                console.error(results);
            } else {
                toast.success("Song added to playlists successfully");
                router.refresh();
                addToPlaylistModal.onClose();
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Add to Playlist"
            description="Select playlists to add the song"
            isOpen={addToPlaylistModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                {playlists.map(playlist => (
                    <CheckBox
                        key={playlist.id}
                        id={playlist.id}
                        label={playlist.name}
                        checked={selectedPlaylists.includes(playlist.id)}
                        onChange={() => handleCheckboxChange(playlist.id)}
                        disabled={isLoading}
                    />
                ))}
                <Button disabled={isLoading} type="submit">
                    Add to Playlist
                </Button>
            </form>
        </Modal>
    );
};

export default AddToPlaylistModal;