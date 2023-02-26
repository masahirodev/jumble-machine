export type SubData = {
  [value: string]: string;
  attribute: string;
  value: string;
};

export type SupportData = {
  description: string;
  background_color: string;
  image: string;
  animation_url: string;
  external_url: string;
  youtube_url: string;
};

export type BlueprintData = {
  id: number;
  name: string;
} & SupportData & {
    imagePath: string;
    subDatas: SubData[];
    [key: string | number]: any;
  };

export const initSubData = {
  attribute: "",
  value: "",
};

export const initSupportData = {
  description: "",
  background_color: "",
  image: "",
  animation_url: "",
  external_url: "",
  youtube_url: "",
};

export const initBlueprintData: BlueprintData = {
  ...{ id: -1, name: "" },
  ...initSupportData,
  ...{
    imagePath: "",
    subDatas: [initSubData],
  },
};
