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
};

export type IntricateDataType = {
  id: number;
  folder: string;
  combi: string;
  fileDatas: FileData[];
  rename?: string;
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
