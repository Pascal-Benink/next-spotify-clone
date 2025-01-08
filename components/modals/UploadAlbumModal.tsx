"use client";

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "../Modal";
import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import CheckBox from "../CheckBox";
import { useUploadAlbumModal } from "@/hooks/useUploadAlbumModal";
import JSZip from "jszip";

const UploadAlbumModal = () => {
    const router = useRouter();
    const uploadAlbumModal = useUploadAlbumModal();

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUser();

    const supabaseClient = useSupabaseClient();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            name: '',
            is_public: true,
            albumZip: null,
            image: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadAlbumModal.onClose();
        }
    }

    const sanitizeFileName = (name: string) => {
        return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const albumZipFile = values.albumZip?.[0];

            if (!imageFile || !albumZipFile || !user) {
                toast.error("Missing fields");
                return;
            }


            const zip = new JSZip();
            const albumZipContent = await zip.loadAsync(albumZipFile);
            // @ts-expect-error : its valid as a file
            const songFiles = [];

            albumZipContent.forEach((relativePath, file) => {
                if (file.name.endsWith(".mp3")) {
                    songFiles.push(file);
                }
            });

            if (songFiles.length === 0) {
                setIsLoading(false);
                return toast.error("No mp3 files found in the zip");
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
                console.error(imageError);
                return toast.error("Failed to upload image");
            }

            console.log(imageData);

            const {
                error: supabaseError
            } = await supabaseClient
                .from(`albums`)
                .insert({
                    user_id: user.id,
                    name: values.name,
                    author: values.author,
                    is_public: values.is_public,
                    image_patch: imageData.path,
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            const {
                data: albumData,
                error: albumError
            } = await supabaseClient
                .from(`albums`)
                .select('*')
                .eq('image_patch', imageData.path)
                .single();

            if (albumError) {
                setIsLoading(false);
                return toast.error(albumError.message);
            }

            const albumId = albumData.id;

            // @ts-expect-error: its valid as a file
            for (const songFile of songFiles) {
                const songName = sanitizeFileName(songFile.name.replace('.mp3', ''));
                const sanitizedSongFileName = sanitizeFileName(songName);

                const isPrivate = !values.is_public;
                // upload song
                const {
                    data: songData,
                    error: songError
                } = await supabaseClient
                    .storage
                    .from('songs')
                    .upload(`song-${sanitizedSongFileName}-${uniqueID}-${songName}`, songFile, {
                        cacheControl: '3600',
                        upsert: false,
                    });

                if (songError) {
                    setIsLoading(false);
                    console.error(songError);
                    return toast.error("Failed to upload song");
                }

                const {
                    error: supabaseSongError
                } = await supabaseClient
                    .from(`songs`)
                    .insert({
                        user_id: user.id,
                        title: songName,
                        author: values.author,
                        is_private: isPrivate,
                        image_path: imageData.path,
                        song_path: songData.path,
                        album_id: albumId
                    });

                if (supabaseSongError) {
                    setIsLoading(false);
                    return toast.error(supabaseSongError.message);
                }
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song uploaded successfully");
            reset();
            uploadAlbumModal.onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Upload Content"
            description="Upload your content to the platform"
            isOpen={uploadAlbumModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="name"
                    disabled={isLoading}
                    {...register('name', { required: true })}
                    placeholder="Album Name"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Album Author"
                />
                <CheckBox
                    id="is_public"
                    label="Public Album"
                    disabled={isLoading}
                    {...register('is_public')}
                />
                <div>
                    <div className="pb-1">
                        Select a zip file
                    </div>
                    <Input
                        id="album"
                        type="file"
                        disabled={isLoading}
                        accept=".zip"
                        {...register('albumZip', { required: true })}
                    />
                </div>
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
                    Create Song
                </Button>
            </form>
        </Modal>
    );
}

export default UploadAlbumModal;