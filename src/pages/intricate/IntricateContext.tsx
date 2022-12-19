import { createContext, useState, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";
import { GlobalAlert } from "../../components/GlobalAlert";
import { useOperateIpc } from "../../hooks/useOperateIpc";
import type { IntricateDataType, SampleData } from "../../schema/intricate";
import type { OperateIpc, ReturnOperateIpc } from "../../schema/ipc";

type IntricateContextType = {
  projectId: number;
  intricateDatas: IntricateDataType[];
  setIntricateDatas: React.Dispatch<React.SetStateAction<IntricateDataType[]>>;
  sampleData: SampleData;
  setSampleData: React.Dispatch<React.SetStateAction<SampleData>>;
  update: boolean;
  setUpdata: React.Dispatch<React.SetStateAction<boolean>>;
  operateIpc: ({ ipc, method, arg }: OperateIpc) => Promise<ReturnOperateIpc>;
  comment: string | string[];
  setComment: React.Dispatch<React.SetStateAction<string | string[]>>;
  saveData: () => Promise<void>;
};

type Props = {
  children: ReactNode;
};

export const IntricateContext = createContext<IntricateContextType>(
  {} as IntricateContextType
);

export const IntricateProvider: React.FC<Props> = ({ children }) => {
  const [initDatas, projectId] = useLoaderData() as [
    IntricateDataType[],
    number
  ];

  const { ipcStatus, setIpcStatus, alert, operateIpc } = useOperateIpc();

  const [intricateDatas, setIntricateDatas] =
    useState<IntricateDataType[]>(initDatas);
  const [sampleData, setSampleData] = useState<SampleData>({ 0: "" });
  const [update, setUpdata] = useState<boolean>(false);

  //TODO コメントuseReducerなどで外だし
  const initComment: string[] = ["ここでは、データを取り込むことができるよ。"];
  const [comment, setComment] = useState<string | string[]>(initComment);

  const saveData = async () => {
    await operateIpc({
      ipc: "store",
      method: "set",
      arg: {
        name: String(projectId),
        key: "intricateDatas",
        value: intricateDatas,
      },
    });
  };

  const value = {
    projectId,
    intricateDatas,
    setIntricateDatas,
    sampleData,
    setSampleData,
    update,
    setUpdata,
    operateIpc,
    comment,
    setComment,
    saveData,
  };
  return (
    <IntricateContext.Provider value={value}>
      {children}
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </IntricateContext.Provider>
  );
};
