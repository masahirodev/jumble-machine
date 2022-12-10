import { createContext, useState, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";
import type { DesignDataType, SampleData } from "../../schema/design";

type DesignContextType = {
  projectId: number;
  designDatas: DesignDataType[];
  setDesignDatas: React.Dispatch<React.SetStateAction<DesignDataType[]>>;
  sampleData: SampleData;
  setSampleData: React.Dispatch<React.SetStateAction<SampleData>>;
  update: boolean;
  setUpdata: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: ReactNode;
};

export const DesignContext = createContext<DesignContextType>(
  {} as DesignContextType
);

export const DesignProvider: React.FC<Props> = ({ children }) => {
  const [initDatas, projectId] = useLoaderData() as [DesignDataType[], number];
  const [designDatas, setDesignDatas] = useState<DesignDataType[]>(initDatas);
  const [sampleData, setSampleData] = useState<SampleData>({ 0: "" });
  const [update, setUpdata] = useState<boolean>(false);

  const value = {
    projectId,
    designDatas,
    setDesignDatas,
    sampleData,
    setSampleData,
    update,
    setUpdata,
  };
  return (
    <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
  );
};
