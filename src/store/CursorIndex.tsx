import { create } from "zustand";

interface StoreState {
  cursorIndex: number | null;
  setCursorIndex: (index: number | null) => void;
}

export const useCursorIndex = create<StoreState>((set) => ({
  cursorIndex: null,
  setCursorIndex: (index) => set({ cursorIndex: index }),
}));
