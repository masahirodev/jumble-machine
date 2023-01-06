export type ConvertContents = {
  key: string;
  value: string;
  link: string;
  symbol: string;
};

export type Convert = ConvertContents & { [key: string]: string };

export const convertHeader: Convert = {
  key: "プロパティ名",
  value: "変更後の値",
  link: "リンクさせるプロパティ名",
  symbol: "リンクさせる独自の記号",
};

export const initConvertDatas: Convert = {
  key: "name",
  value: "",
  link: "",
  symbol: "",
};
