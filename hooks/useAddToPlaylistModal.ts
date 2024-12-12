import { create } from "zustand";

interface useAddToPlaylistModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useAddToPlaylistModal = create<useAddToPlaylistModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))