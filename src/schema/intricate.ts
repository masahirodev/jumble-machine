export type OptionPart = {
  folder: string;
  name: string;
  option: number;
  property: "random" | "fixed";
};

export type FileData = {
  name: string;
  option: number;
  optionParts?: OptionPart[];
  rename?: string;
};

export type IntricateDataType = {
  id: number;
  folder: string;
  combi: string;
  rename?: string;
  notRemove?: boolean;
  fileDatas: FileData[];
  property?: "default" | "random" | "fixed";
  pairing: "main" | "option" | "bg" | "delete";
};

export type FileListType = { [key: string]: string[] };

export type SampleData = {
  [key: number]: string;
};

export type Sample = {
  folder: string;
  file: string;
}[];
