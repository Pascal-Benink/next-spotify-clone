import { create } from "zustand";

interface EditSongModalStore {
    isOpen: boolean;
    songId: string | null;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useEditSongModal = create<EditSongModalStore>((set) => ({
    isOpen: false,
    songId: null,
    onOpen: (id: string) => set({ isOpen: true, songId: id }),
    onClose: () => set({ isOpen: false, songId: null }),
}))