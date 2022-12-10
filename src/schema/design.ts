export type DesignDataType = {
  id: number;
  folder: string;
  combi: string;
  fileDatas: { name: string; option: number }[];
  rename?: string;
  property?: boolean;
};

export type FileListType = { [key: string]: string[] };

export type SampleData = {
  [key: number]: string;
};
