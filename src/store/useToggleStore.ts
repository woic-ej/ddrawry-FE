import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ToggleState{
    isCalenderView: boolean;
    isTotalView: boolean;
    setIsCalenderView: (isCalenderView: boolean) => void;
    setIsTotalView: (isTotalView: boolean) => void;
}

export const useToggleStore = create<ToggleState>(
  persist(
    (set) => ({
      isCalenderView: true,
      isTotalView: true,
      setIsCalenderView: (isCalenderView) =>
        set({
          isCalenderView,
        }),
      setIsTotalView: (isTotalView) =>
        set({
          isTotalView,
        }),
    }),
    { name: "title-storage" },
  ) as (set: (fn: (state: ToggleState) => ToggleState) => void) => ToggleState,
);