import { create } from "zustand";

interface PlayerStore {
    ids: string[];
    activateId?: string;
    shuffle: boolean;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    toggleShuffle: () => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activateId: undefined,
    shuffle: false,
    setId: (id: string) => set({activateId: id}),
    setIds: (ids: string[]) => set({ids: ids}),
    toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
    reset: () => set({activateId: undefined}),
}));

export default usePlayer;