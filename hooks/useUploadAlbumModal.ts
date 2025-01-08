import { create } from "zustand";

interface UploadAlbumModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useaUploadAlbumModal = create<UploadAlbumModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))