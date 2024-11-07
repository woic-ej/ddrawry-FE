export type BaseDiaryType = {
  id: number;
  date: string;
  image: string | null;
  bookmark: boolean;
  title?: string
};

export type DiaryListType = BaseDiaryType & {
  title: string;
};

export type DiaryDataType = BaseDiaryType & {
  nickname: string;
  count?: number;
  isFull?: boolean;
  mood: string;
  weather: string;
  title: string;
  story: string;
};
