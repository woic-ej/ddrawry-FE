import { useDateStore } from "@store/useDateStore";
import { addMonths, subMonths } from "date-fns";
import { useCallback } from "react";

export const useDateControl = () => {
  const { currentDate, setCurrentDate } = useDateStore();

  const prevMonthHandler = useCallback(() => {
    setCurrentDate(subMonths(currentDate, 1));
  }, [currentDate, setCurrentDate]);

  const nextMonthHandler = useCallback(() => {
    setCurrentDate(addMonths(currentDate, 1));
  }, [currentDate, setCurrentDate]);

  return { currentDate, setCurrentDate, prevMonthHandler, nextMonthHandler };
};
