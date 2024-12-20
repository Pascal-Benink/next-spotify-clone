"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import TextArea from "./TextArea";
import { useAddLyricsModal } from "@/hooks/useAddLyricsModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const AddLyricsModal = () => {
    const router = useRouter();
    const addLyricsModal = useAddLyricsModal();
    const supabaseClient = useSupabaseClient();

    interface Lyrics {
        lyrics: string | null;
    }
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const [lyrics, setLyrics] = useState<Lyrics[]>([]);
    const songId = addLyricsModal.songId;

    const {
        register,
        handleSubmit,
        reset,
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            lyrics: '',
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            addLyricsModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            if (!user) {
                toast.error("User missing");
                return;
            }

            const { data: existingLyrics, error: fetchError } = await supabaseClient
                .from('song_lyrics')
                .select('id')
                .eq('song_id', songId)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') {
                setIsLoading(false);
                return toast.error(fetchError.message);
            }

            if (existingLyrics) {
                const { error: updateError } = await supabaseClient
                    .from('song_lyrics')
                    .update({ lyrics: values.lyrics })
                    .eq('id', existingLyrics.id);

                if (updateError) {
                    setIsLoading(false);
                    return toast.error(updateError.message);
                }
            } else {
                const { error: insertError } = await supabaseClient
                    .from('song_lyrics')
                    .insert({
                        user_id: user.id,
                        song_id: songId,
                        lyrics: values.lyrics,
                    });

                if (insertError) {
                    setIsLoading(false);
                    return toast.error(insertError.message);
                }
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Lyrics uploaded successfully");
            reset();
            addLyricsModal.onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const fetchLyrics = async () => {
        try {
            const { data: lyricsData, error: lyricsError } = await supabaseClient
                .from("song_lyrics")
                .select("lyrics")
                .eq("song_id", songId);

            if (lyricsError) {
                return toast.error("Something went wrong fetching lyrics");
            }

            setLyrics(lyricsData);
        } catch {
            toast.error("Something went wrong fetching lyrics");
        }
    }

    useEffect(() => {
        if (addLyricsModal.isOpen) {
            fetchLyrics();
        }
    }, [addLyricsModal.isOpen]);

    useEffect(() => {
        if (lyrics.length > 0) {
            setValue('lyrics', lyrics[0].lyrics || '');
        }
    }, [lyrics, setValue]);

    return (
        <Modal
            title="Upload Lyrics"
            description="Upload your lyrics to the song"
            isOpen={addLyricsModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <TextArea
                    id="lyrics"
                    disabled={isLoading}
                    {...register('lyrics', { required: true })}
                    placeholder="Song Lyrics"
                    className="h-[20vh]"
                />
                <Button disabled={isLoading} type="submit">
                    Add lyrics
                </Button>
            </form>
        </Modal>
    );
}

export default AddLyricsModal;