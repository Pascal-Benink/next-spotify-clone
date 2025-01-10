"use client"

import { useCreatePodcastModal } from "@/hooks/useCreatePodcastModal";
import uniqid from "uniqid";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useForm, FieldValues, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { PodcastTag } from "@/types";
import SearchSelect from "../SearchSelect";
const CreatePodcastModal = () => {
    const router = useRouter();
    const createPodcastModal = useCreatePodcastModal();

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUser();

    const supabaseClient = useSupabaseClient();

    const [tags, setTags] = useState<PodcastTag[]>([]);

    const [selectOpen, setSelectOpen] = useState(false);

    const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchTags = async () => {
            const { data: tagsData, error } = await supabaseClient
                .from('podcast_tags')
                .select('*');

            if (error) {
                return toast.error(error.message);
            }

            console.log(tagsData);

            setTags(tagsData);
        }

        fetchTags();
    }, [])

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            subtitle: '',
            description: '',
            author: '',
            tag_id: '',
            image: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            setSelectOpen(false);
            createPodcastModal.onClose();
        }
    }

    const sanitizeFileName = (name: string) => {
        return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];

            if (!imageFile || !user) {
                toast.error("Missing fields");
                return;
            }

            const uniqueID = uniqid();
            const sanitizedFileName = sanitizeFileName(values.name);

            // upload image
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${sanitizedFileName}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (imageError) {
                setIsLoading(false);
                return toast.error("Failed to upload image");
            }

            const {
                error: supabaseError
            } = await supabaseClient
                .from(`podcasts`)
                .insert({
                    user_id: user.id,
                    name: values.name,
                    subtitle: values.subtitle,
                    description: values.description,
                    author: values.author,
                    image_path: imageData.path,
                    tag_id: selectedTag,
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Podcast Created successfully");
            reset();
            createPodcastModal.onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Create Podcast"
            description="Create a new podcast"
            isOpen={createPodcastModal.isOpen}
            onChange={onChange}
        >
            <SearchSelect
                disabled={isLoading}
                data={tags.map(tag => ({ id: tag.id, name: tag.name }))}
                isOpen={selectOpen}
                onOpenChange={() => setSelectOpen(!selectOpen)}
                placeholder="Select a Tag"
                className="mb-4"
                selected={selectedTag}
                onSelect={(selectedTag) => setSelectedTag(selectedTag)} 
                />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="name"
                    disabled={isLoading}
                    {...register('name', { required: true })}
                    placeholder="Podcast Name"
                />
                <Input
                    id="subtitle"
                    disabled={isLoading}
                    {...register('subtitle', { required: true })}
                    placeholder="Podcast Subtitle"
                />
                <Input
                    id="description"
                    disabled={isLoading}
                    {...register('description', { required: true })}
                    placeholder="Podcast Description"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Podcast Author"
                />
                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register('image', { required: true })}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create Podcast
                </Button>
            </form>
        </Modal>
    );
}

export default CreatePodcastModal;