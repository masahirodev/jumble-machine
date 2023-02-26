export type DeletePairData = {
  [key: string]: string;
  attribute1: string;
  value1: string;
  attribute2: string;
  value2: string;
};

export const initDeletePairData: DeletePairData = {
  attribute1: "aaa",
  value1: "bbb",
  attribute2: "cvc",
  value2: "ddd",
};

export type DeleteDatas = {
  deletePairDatas: DeletePairData[];
};

export const initDeleteDatas: DeleteDatas = {
  deletePairDatas: [initDeletePairData],
};
