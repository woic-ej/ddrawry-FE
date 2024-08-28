import { format } from "date-fns";

export const getDate = (date: Date) => {
  return format(date, "yyyy년 M월 d일");
};
