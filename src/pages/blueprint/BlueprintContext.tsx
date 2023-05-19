import { createContext, useState, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";

import { BlueprintData } from "../../schema/blueprintData";
import { useSaveDatas } from "../../hooks/useSaveDatas";
import { GlobalAlert } from "../../components/GlobalAlert";
import { useCheckBlueprintDatas } from "../../hooks/useCheckBlueprintDatas";

type BlueprintContextType = {
  blueprintDatas: BlueprintData[];
  setBlueprintDatas: React.Dispatch<React.SetStateAction<BlueprintData[]>>;
  projectId: number;
  editData: BlueprintData;
  setEditData: React.Dispatch<React.SetStateAction<BlueprintData>>;
  deleteData: (delId: number) => void;
  addData: (editData: BlueprintData) => number;
  moveData: (editId: number, k: number) => void;
  exData: string[];
  setExData: React.Dispatch<React.SetStateAction<string[]>>;
  exportPath: string;
  saveData: () => Promise<void>;
  numberDataPerPage: number;
  setNumberDataPerPage: React.Dispatch<React.SetStateAction<number>>;
  totalData: number;
  setTotalData: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  switchingDisplay: boolean;
  setSwitchingDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: ReactNode;
};

export const BlueprintContext = createContext<BlueprintContextType>(
  {} as BlueprintContextType
);

export const BlueprintProvider: React.FC<Props> = ({ children }) => {
  const { dbBlueprintDatas, projectId, userNumberDataPerPage, exportPath } =
    useLoaderData() as {
      dbBlueprintDatas: BlueprintData[];
      projectId: number;
      userNumberDataPerPage: number;
      exportPath: string;
    };

  const initEditDatas: BlueprintData[] = dbBlueprintDatas.filter(
    (value, index) => {
      return userNumberDataPerPage > index; //value.id;
    }
  );

  const [blueprintDatas, setBlueprintDatas] = useState(initEditDatas);
  const [editData, setEditData] = useState(initEditDatas[0]);
  const [totalData, setTotalData] = useState(dbBlueprintDatas.length);

  useCheckBlueprintDatas({ blueprintDatas });

  const initExData = initEditDatas
    .map((initEditData) => {
      return initEditData.subDatas.map((subData) => subData.attribute);
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
  const addData = (editData: BlueprintData): number => {
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
  const [numberDataPerPage, setNumberDataPerPage] = useState<number>(
    userNumberDataPerPage
  );

  //テーブルを保存する
  const { status, setStatus, alert, saveDataFunc } = useSaveDatas(
    projectId,
    numberDataPerPage,
    page,
    blueprintDatas
  );

  const saveData = async () => {
    await saveDataFunc();
  };

  //画面切替
  const [switchingDisplay, setSwitchingDisplay] = useState<boolean>(false);

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
    numberDataPerPage,
    setNumberDataPerPage,
    totalData,
    setTotalData,
    page,
    setPage,
    switchingDisplay,
    setSwitchingDisplay,
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
