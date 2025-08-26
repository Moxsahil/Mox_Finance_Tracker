import { create } from "zustand";

type NewGoalState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useNewGoal = create<NewGoalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));