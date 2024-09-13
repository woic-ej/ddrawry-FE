export type CalenderDataType = {
  id: number;
  date: string;
  image: string;
  bookmark: number;
};

export type DiaryDataType = {
  id: number;
  date: string;
  nickname: string;
  count?: number;
  isFull?: boolean;
  mood: string;
  weather: string;
  title: string;
  image: string | null;
  story: string;
};
