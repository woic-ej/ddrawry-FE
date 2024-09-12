import { create } from "zustand";

interface ImageState {
  image: string | null;
  setImage: (image: string) => void;
  clearImage: () => void;
}

const useImageStore = create<ImageState>((set) => ({
  image: null,
  setImage: (image: string) => set({ image }),
  clearImage: () => set({ image: null }),
}));

export default useImageStore;
