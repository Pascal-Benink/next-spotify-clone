"use client";

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useUploadPodcastEpisodeModal } from "@/hooks/useUploadPodcastEpisodeModal";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import CheckBox from "../CheckBox";
import { PodcastEpisode } from "@/types";
import { getMimeType } from "@/lib/getMimeType";

const UploadPodcastEpisodeModal = () => {
    const MAX_CHUNK_SIZE = 50 * 1024 * 1024; // 50MB
    const router = useRouter();
    const uploadPodcastEpisodeModal = useUploadPodcastEpisodeModal();

    const { PodcastId } = uploadPodcastEpisodeModal;

    const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUser();

    const supabaseClient = useSupabaseClient();

    const getMaxEpisodeNumber = () => {
        if (podcastEpisodes.length === 0) return 0;
        return Math.max(...podcastEpisodes.map(episode => parseInt(episode.episode_number)));
    };

    const newEpisodeNumber = getMaxEpisodeNumber() + 1;

    const fetchPodcastEpisodes = async () => {
        if (!PodcastId) {
            return;
        }

        const { data, error } = await supabaseClient
            .from('podcast_episodes')
            .select('*')
            .eq('podcast_id', PodcastId);

        if (error) {
            console.error('Error fetching podcast episodes:', error);
            toast.error("Failed to fetch podcast episodes");
            return;
        }

        if (!data) {
            console.warn('No data returned for podcast episodes');
            toast.error("No podcast episodes found");
            return;
        }

        setPodcastEpisodes(data.map((item) => ({
            ...item,
        })));
    }

    useEffect(() => {
        fetchPodcastEpisodes();
    }, [PodcastId]);

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            episode_number: newEpisodeNumber,
            title: '',
            episode_description: '',
            is_private: false,
            episode: null,
        }
    })

    useEffect(() => {
        reset({
            episode_number: newEpisodeNumber || '',
            title: '',
            episode_description: '',
            is_private: false,
            episode: null,
        });
    }, [newEpisodeNumber])

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadPodcastEpisodeModal.onClose();
        }
    }

    const sanitizeFileName = (name: string) => {
        return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const episodeFile = values.episode?.[0];

            if (!episodeFile || !user) {
                toast.error("Missing fields");
                return;
            }

            const {
                error: supabaseError
            } = await supabaseClient
                .from(`podcast_episodes`)
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    is_private: values.is_private,
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            const sanitizedFileName = sanitizeFileName(values.title);

            const uniqueID = uniqid();

            const totalChunks = Math.ceil(episodeFile.size / MAX_CHUNK_SIZE);

            for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
                const start = chunkIndex * MAX_CHUNK_SIZE;
                const end = Math.min(start + MAX_CHUNK_SIZE, episodeFile.size);
                const chunk = episodeFile.slice(start, end);

                const mimeType = getMimeType(episodeFile.name);

                const correctBlob = new Blob([chunk], { type: 'audio/mpeg' });

                console.log(`Uploading chunk ${chunkIndex + 1} of ${totalChunks} for episode ${values.title} (${values.episode_number}) with episode-${values.episode_number}-${sanitizedFileName}-${uniqueID}-chunk-${chunkIndex} Mime Type: ${mimeType} chunck: ${correctBlob}`);

                const {
                    data: episodeData,
                    error: episodeError
                } = await supabaseClient
                    .storage
                    .from('podcast_episodes')
                    .upload(`episode-${values.episode_number}-${sanitizedFileName}-${uniqueID}-chunk-${chunkIndex}`, correctBlob, {
                        cacheControl: '3600',
                        upsert: false,
                        contentType: mimeType
                    });

                console.log(episodeData);

                if (episodeError) {
                    setIsLoading(false);
                    console.error(episodeError);
                    return toast.error("Failed to upload episode chunk");
                }
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song uploaded successfully");
            reset();
            uploadPodcastEpisodeModal.onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Upload Episode"
            description="Upload your podcast episode to the platform"
            isOpen={uploadPodcastEpisodeModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="episode_number"
                    disabled={isLoading}
                    {...register('episode_number', { required: true })}
                    placeholder="Episode Number"
                />
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Episode Title"
                />
                <Input
                    id="episode_description"
                    disabled={isLoading}
                    {...register('episode_description', { required: true })}
                    placeholder="Episode Description"
                />
                <CheckBox
                    id="is_private"
                    label="Private Episode"
                    disabled={isLoading}
                    {...register('is_private')}
                />
                <div>
                    <div className="pb-1">
                        Select a episode file
                    </div>
                    <Input
                        id="episode"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3" // change to audio/* if want to
                        {...register('episode', { required: true })}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Upload Episode
                </Button>
            </form>
        </Modal>
    );
}

export default UploadPodcastEpisodeModal;