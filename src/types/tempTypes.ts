export type TempDiaryType = {
  date: string;
  nickname: string;
  title?: string;
  weather?: string;
  mood?: string;
  story?: string;
  image?: string;
};

export type CancelTempDiaryPayload = {
  date: string;
  type: "main" | "write";
};

export type HasTempDiaryResponse = {
  temp_id: number;
  is_temp_exist: boolean;
};

export type EditDiaryResponse = {
  temp_id: number;
};
