"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/modals/AuthModal";
import UploadModal from "@/components/modals/UploadModal";
import SubscribeModal from "@/components/modals/SubscribeModal";
import { ProductWithPrice } from "@/types";
import CreatePlaylistModal from "@/components/modals/CreatePlaylistModal";
import AddToPlaylistModal from "@/components/modals/AddToPlaylistModal";
import DeletePlaylistModal from "@/components/modals/DeletePlaylistModal";
import DeleteSongModal from "@/components/modals/DeleteSongModal";
import SongEditModal from "@/components/modals/EditSongModal";
import AddLyricsModal from "@/components/modals/AddLyricsModal";
import PlaylistEditModal from "@/components/modals/EditPlaylistModal";
import BatchAddToPlaylistModal from "@/components/modals/BatchAddToPlaylistModal";
import ClonePlaylistModal from "@/components/modals/ClonePlaylistModal";
import CreateAlbumModal from "@/components/modals/CreateAlbumModal";
import UploadAlbumModal from "@/components/modals/UploadAlbumModal";

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
            <UploadAlbumModal />
            <CreatePlaylistModal />
            <AddToPlaylistModal />
            <DeletePlaylistModal />
            <DeleteSongModal />
            <SongEditModal />
            <AddLyricsModal />
            <PlaylistEditModal />
            <BatchAddToPlaylistModal />
            <ClonePlaylistModal />
            <CreateAlbumModal />
        </>
    );
}

export default ModalProvider;