"use client";

import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { BiTrash } from "react-icons/bi";
import { FaEllipsisH } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { useCreateAlbumModal } from "@/hooks/useCreateAlbumModal";

interface AlbumItemDropdownProps {
    songId: string;
    albumId: string;
    isOwner: boolean;
}

const AlbumItemDropdown = ({ songId, albumId, isOwner }: AlbumItemDropdownProps) => {
    const authModal = useAuthModal();
    const subscribeModal = useSubscribeModal();
    const supabaseClient = useSupabaseClient();
    const createAlbumModal = useCreateAlbumModal();
    const router = useRouter();

    const { user, subscription } = useUser();

    const [isOpen, setIsOpen] = useState(false);

    const [userHasPLaylist, setUserHasAlbum] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const checkUserAlbum = async () => {
            const { data, error } = await supabaseClient
                .from("albums")
                .select("id")
                .eq("user_id", user.id);

            if (error || !data) {
                console.log(error, "data: ", data);
                // toast.error("You need to create a album first!");
            }

            if (data) {
                setUserHasAlbum(true);
            }
        };

        checkUserAlbum();
    }, [supabaseClient, user?.id]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="focus:outline-none" aria-label="Customise options">
                    <FaEllipsisH
                        size={20}
                        onClick={handleToggle}
                        className={`text-neutral-400 cursor-pointer hover:text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="py-2 min-w-[220px] rounded-md bg-neutral-800 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                    sideOffset={5}
                >
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default AlbumItemDropdown;