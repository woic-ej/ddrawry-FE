export type CreateImagePayLoad = {
  temp_id: string;
  story: string;
};

export type GetImageResponse = {
  id: number;
  image: string;
};

export type GetCountResponse = {
  remain_count: number;
  image_count: number;
};
