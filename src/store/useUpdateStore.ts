import { create } from "zustand";

interface UpdateState {
  isUpdate: Boolean;
  setIsUpdate: (isUpdate: Boolean) => void;
  clearIsUpdate: () => void;
}

export const useUpdateStore = create<UpdateState>((set) => ({
  isUpdate: false,
  setIsUpdate: (isUpdate: Boolean) => set({ isUpdate }),
  clearIsUpdate: () => set({ isUpdate: false }),
}));
