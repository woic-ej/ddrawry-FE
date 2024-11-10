import { TempDiaryType } from "src/types/tempTypes";
import { create } from "zustand";

interface TempDataState {
  tempData: TempDiaryType | null;
  setTempData: (tempData: TempDiaryType) => void;
  addTempData: (field: keyof TempDiaryType, value: string | number) => void;
  clearTempData: () => void;
}

export const useTempDataStore = create<TempDataState>((set) => ({
  tempData: null,
  setTempData: (tempData: TempDiaryType) => set({ tempData }),
  addTempData: (field, value) =>
    set((state) => ({
      tempData: state.tempData ? { ...state.tempData, [field]: value } : null,
    })),
  clearTempData: () => set({ tempData: null }),
}));
