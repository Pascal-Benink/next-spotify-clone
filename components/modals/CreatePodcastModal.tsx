"use client"

import { useCreatePodcastModal } from "@/hooks/useCreatePodcastModal";
import uniqid from "uniqid";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
const CreatePodcastModal = () => {
    const router = useRouter();
    const createPodcastModal = useCreatePodcastModal();

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUser();

    const supabaseClient = useSupabaseClient();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            subtitle: '',
            description: '',
            author: '',
            image: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
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
                .from(`playlists`)
                .insert({
                    user_id: user.id,
                    name: values.name,
                    description: values.description,
                    is_public: values.isPublic,
                    image_path: imageData.path,
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Playlist Created successfully");
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="name"
                    disabled={isLoading}
                    {...register('name', { required: true })}
                    placeholder="Playlist Name"
                />
                <Input
                    id="subtitle"
                    disabled={isLoading}
                    {...register('subtitle', { required: true })}
                    placeholder="Playlist Subtitle"
                />
                <Input
                    id="description"
                    disabled={isLoading}
                    {...register('description', { required: true })}
                    placeholder="Playlist Description"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Playlist Author"
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