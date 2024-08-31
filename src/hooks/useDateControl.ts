import { addMonths, subMonths } from "date-fns";
import { useCallback, useState } from "react";

export const useDateControl = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonthHandler = useCallback(() => {
    setCurrentDate(subMonths(currentDate, 1));
  }, [currentDate]);

  const nextMonthHandler = useCallback(() => {
    setCurrentDate(addMonths(currentDate, 1));
  }, [currentDate]);

  return { currentDate, setCurrentDate, prevMonthHandler, nextMonthHandler };
};
