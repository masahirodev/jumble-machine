import { createContext, useState, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";
import { initPrepData, PrepData } from "../../schema/prepData";

type PrepContextType = {
  prepData: PrepData;
  setPrepData: React.Dispatch<React.SetStateAction<PrepData>>;
  maxQuantity: number;
  projectId: number;
  hasIntricateDatas: boolean;
};

type Props = {
  children: ReactNode;
};

export const PrepContext = createContext<PrepContextType>(
  {} as PrepContextType
);

export const PrepProvider: React.FC<Props> = ({ children }) => {
  const [savedPrepData, maxQuantity, projectId, hasIntricateDatas] =
    useLoaderData() as [PrepData, number, number, boolean];

  const [prepData, setPrepData] = useState<PrepData>(
    savedPrepData === undefined ? initPrepData : savedPrepData
  );

  const value = {
    prepData,
    setPrepData,
    maxQuantity,
    projectId,
    hasIntricateDatas,
  };
  return <PrepContext.Provider value={value}>{children}</PrepContext.Provider>;
};
