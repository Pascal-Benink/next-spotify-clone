import { create } from "zustand";

interface AlbumUploadModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useaAbumUploadModal = create<AlbumUploadModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))