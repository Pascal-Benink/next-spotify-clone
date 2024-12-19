"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/types";
import AlbumUploadModal from "@/components/AlbumUploadModal";
import CreatePlaylistModal from "@/components/CreatePlaylistModal";
import AddToPlaylistModal from "@/components/AddToPlaylistModal";
import DeletePlaylistModal from "@/components/DeletePlaylistModal";
import DeleteSongModal from "@/components/DeleteSongModal";
import SongEditModal from "@/components/EditSongModal";
import AddLyricsModal from "@/components/AddLyricsModal";
import PlaylistEditModal from "@/components/EditPlaylistModal";

interface ModalProviderProps {
    products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
    products
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <UploadModal />
            <SubscribeModal products={products} />
            <AlbumUploadModal />
            <CreatePlaylistModal />
            <AddToPlaylistModal />
            <DeletePlaylistModal />
            <DeleteSongModal />
            <SongEditModal />
            <AddLyricsModal />
            <PlaylistEditModal />
        </>
    );
}

export default ModalProvider;