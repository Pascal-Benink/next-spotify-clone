import { create } from "zustand";

interface DeleteSongModalStore {
    isOpen: boolean;
    songId: string | null;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useDeleteSongModal = create<DeleteSongModalStore>((set) => ({
    isOpen: false,
    songId: null,
    onOpen: (id: string) => set({ isOpen: true, songId: id }),
    onClose: () => set({ isOpen: false, songId: null }),
}));