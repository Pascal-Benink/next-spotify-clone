import { create } from "zustand";

interface useBatchAddToPlaylistModalStore {
    isOpen: boolean;
    songId: string[] | []; // Add songId to the store
    onOpen: (id: string[]) => void; // Update onOpen to accept an id
    onClose: () => void;
}

export const useBatchAddToPlaylistModal = create<useBatchAddToPlaylistModalStore>((set) => ({
    isOpen: false,
    songId: [], // Initialize songId as null
    onOpen: (id: string[]) => set({ isOpen: true, songId: id }), // Set songId when opening
    onClose: () => set({ isOpen: false, songId: [] }), // Reset songId when closing
}));