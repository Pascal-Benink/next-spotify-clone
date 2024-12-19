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
        </>
    );
}

export default ModalProvider;