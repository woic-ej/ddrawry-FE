import { create } from "zustand";

interface DiaryState {
  mood: string | null;
  setMood: (mood: string | null) => void;
  weather: string | null;
  setWeather: (weather: string | null) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  clearContent: () => void;
  clearAll: () => void;
  maxLength: number;
  limitLength: number;
}

const useDiaryStore = create<DiaryState>((set) => ({
  mood: null,
  setMood: (mood: string | null) => set({ mood }),
  weather: null,
  setWeather: (weather: string | null) => set({ weather }),
  title: "",
  setTitle: (title: string) => set({ title }),
  content: "",
  setContent: (content: string) => set({ content }),
  clearContent: () => set({ content: "" }),
  clearAll: () =>
    set({
      mood: null,
      weather: null,
      title: "",
      content: "",
    }),
  maxLength: 240,
  limitLength: 150,
}));

export default useDiaryStore;
