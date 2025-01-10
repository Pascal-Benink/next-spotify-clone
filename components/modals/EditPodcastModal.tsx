"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "../Modal";
import { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEditPodcastModal } from "@/hooks/useEditPodcastModal";
import CheckBox from "../CheckBox";
import { PodcastTag } from "@/types";

const PodcastEditModal = () => {
    const router = useRouter();
    const editPodcastModal = useEditPodcastModal();

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUser();

    const supabaseClient = useSupabaseClient();

    const podcastId = editPodcastModal.podcastId;

    interface Podcast {
        id: string;
        user_id: string;
        name: string;
        description: string;
        is_public: boolean;
    }

    const [podcast, setPodcast] = useState<Podcast | null>(null);

    const [tags, setTags] = useState<PodcastTag[]>([]);

    const [selectOpen, setSelectOpen] = useState(false);

    const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

    const [selectedtagList, setSelectedTagList] = useState<{ id: string, listId: string }[]>([]);

    const fetchPodcast = async () => {
        try {
            const { data: podcast, error } = await supabaseClient
                .from('podcasts')
                .select('*')
                .eq('id', podcastId)
                .eq('user_id', user?.id)
                .single();

            if (error) {
                console.error("Error fetching podcast: ", error);
                toast.error("Failed to fetch podcast");
                return;
            }

            setPodcast(podcast);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        if (!podcastId) {
            return;
        }

        fetchPodcast();
    }, [podcastId]);

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            id: podcast?.id || podcastId,
            user_id: podcast?.user_id || '',
            description: podcast?.description || '',
            name: podcast?.name || '',
            is_public: podcast?.is_public || false,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            editPodcastModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const {
                error: supabaseError
            } = await supabaseClient
                .from(`podcasts`)
                .update({
                    name: values.name,
                    description: values.description,
                    is_public: values.is_public
                })
                .eq('id', podcastId)

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Podcast uploaded successfully");
            reset();
            editPodcastModal.onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        reset({
            id: podcast?.id || podcastId,
            user_id: podcast?.user_id || '',
            description: podcast?.description || '',
            name: podcast?.name || '',
            is_public: podcast?.is_public || false,
        });
    }, [podcast])

    return (
        <Modal
            title="Edit Podcast"
            description="Edit a podcast you uploaded to the platform"
            isOpen={editPodcastModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="name"
                    disabled={isLoading}
                    {...register('name', { required: true })}
                    placeholder="Podcast Name"
                />
                <Input
                    id="description"
                    disabled={isLoading}
                    {...register('description', { required: true })}
                    placeholder="Podcast Description"
                />
                <CheckBox
                    id="is_public"
                    label="Public Podcast"
                    disabled={isLoading}
                    {...register('is_public')}
                />
                <Button disabled={isLoading} type="submit">
                    Edit Podcast
                </Button>
            </form>
        </Modal>
    );
}

export default PodcastEditModal;