import { create } from "zustand";

interface DeletePlaylistModalStore {
    isOpen: boolean;
    playlistId: string | null;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useDeletePlaylistModal = create<DeletePlaylistModalStore>((set) => ({
    isOpen: false,
    playlistId: null,
    onOpen: (id: string) => set({ isOpen: true, playlistId: id }),
    onClose: () => set({ isOpen: false, playlistId: null }),
}))