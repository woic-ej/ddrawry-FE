import { create } from "zustand";

interface DateState {
  currentDate: Date;
  setCurrentDate: (currentDate: Date) => void;
  clearCurrentDate: () => void;
}

export const useDateStore = create<DateState>((set) => ({
  currentDate: new Date(),
  setCurrentDate: (currentDate: Date) => set({ currentDate }),
  clearCurrentDate: () => set({ currentDate: new Date() }),
}));
