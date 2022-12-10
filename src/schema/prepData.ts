export type PrepData = {
  [key: string]: string | number;
  quantity: number;
  name: string;
  description: string;
  background_color: string;
  image: string;
  animation_url: string;
  external_url: string;
  youtube_url: string;
};

export const initPrepData = {
  quantity: 1,
  name: "",
  description: "",
  background_color: "",
  image: "",
  animation_url: "",
  external_url: "",
  youtube_url: "",
};
