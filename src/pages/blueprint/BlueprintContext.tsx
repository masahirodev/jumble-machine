import { createContext, useState, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";

import { Data, initData } from "../../schema/data";
import { useSaveDatas } from "../../hooks/useSaveDatas";
import { GlobalAlert } from "../../components/GlobalAlert";

type BlueprintContextType = {
  blueprintDatas: Data[];
  setBlueprintDatas: React.Dispatch<React.SetStateAction<Data[]>>;
  projectId: number;
  editData: Data;
  setEditData: React.Dispatch<React.SetStateAction<Data>>;
  deleteData: (delId: number) => void;
  addData: (editData: Data) => number;
  moveData: (editId: number, k: number) => void;
  exData: string[];
  setExData: React.Dispatch<React.SetStateAction<string[]>>;
  exportPath: string;
  saveData: () => Promise<void>;
  NumberDataPerPage: number;
  setNumberDataPerPage: React.Dispatch<React.SetStateAction<number>>;
  totalData: number;
  setTotalData: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  reloadData: () => Promise<void>;
};

type Props = {
  children: ReactNode;
};

export const BlueprintContext = createContext<BlueprintContextType>(
  {} as BlueprintContextType
);

export const BlueprintProvider: React.FC<Props> = ({ children }) => {
  const [data, projectId, exportPath, initNumberDataPerPage, initTotalData] =
    useLoaderData() as [Data[], number, string, number, number];

  const initDatas = data !== undefined ? data : [initData];
  const [blueprintDatas, setBlueprintDatas] = useState(initDatas);
  const [editData, setEditData] = useState(initDatas[0]);
  const [totalData, setTotalData] = useState(initTotalData);

  const initExData = initDatas
    .map((initData) => {
      return initData.subDatas.map((subData) => subData.attribute);
    })
    .flat()
    .filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });

  const [exData, setExData] = useState<string[]>(initExData);

  //データ削除
  const deleteData = (delId: number) => {
    if (blueprintDatas.length !== 1) {
      const delData = blueprintDatas.filter((blueprintData) => {
        return delId !== blueprintData.id;
      });
      setBlueprintDatas(delData);
    }
    //TODO
    else console.log("最後のデータ");
  };

  //データ追加
  const addData = (editData: Data): number => {
    const id: number =
      Math.max.apply(
        0,
        blueprintDatas.map((blueprintData) => {
          return blueprintData.id;
        })
      ) + 1;
    const upDateData = { ...editData, id: id };
    setBlueprintDatas([...blueprintDatas, ...[upDateData]]);
    return id;
  };

  //編集するデータを変更
  const moveData = (editId: number, k: number) => {
    const array = blueprintDatas.map((blueprintData) => {
      return blueprintData.id;
    });
    let id = array.indexOf(editId) + k;
    switch (id) {
      case -1:
        id = array.length - 1;
        break;
      case array.length:
        id = 0;
        break;
      default:
    }
    setEditData(blueprintDatas[id]);
  };

  //ページ設定
  const [page, setPage] = useState(1);
  const [NumberDataPerPage, setNumberDataPerPage] = useState<number>(
    initNumberDataPerPage
  );

  //テーブルを保存する
  const { status, setStatus, alert, saveDataFunc } = useSaveDatas(
    1,
    NumberDataPerPage,
    page,
    blueprintDatas
  );
  const saveData = async () => {
    await saveDataFunc();
  };

  //TODO saveDataFuncとreloadDataとをuseOperateIpcに統合
  //データをリロードする
  const reloadData = async () => {
    const dataStore = await window.storeApi.getStoreValue(
      String(projectId),
      "blueprint"
    );
    setBlueprintDatas(dataStore);
  };

  const value = {
    blueprintDatas,
    setBlueprintDatas,
    projectId,
    editData,
    setEditData,
    deleteData,
    addData,
    moveData,
    exData,
    setExData,
    exportPath,
    saveData,
    NumberDataPerPage,
    setNumberDataPerPage,
    totalData,
    setTotalData,
    page,
    setPage,
    reloadData,
  };
  return (
    <>
      <BlueprintContext.Provider value={value}>
        {children}
      </BlueprintContext.Provider>
      <GlobalAlert ipcStatus={status} setIpcStatus={setStatus} alert={alert} />
    </>
  );
};
