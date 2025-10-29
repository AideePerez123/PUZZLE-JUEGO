import { create } from "zustand";

type Player = {
    name: string;
    movimientos: number;
};

type PlayerListStore = {
    List: Player[];
    saveList: (newName: string, movimientos: number) => void;
};

export const useEjemplo = create<PlayerListStore>((set) => ({
    List: [],
    saveList: (newName: string, movimientos: number) =>
        set((state) => ({
            List: [
                ...state.List,
                {
                    name: newName,
                    movimientos,
                },
            ],
        })),
}));