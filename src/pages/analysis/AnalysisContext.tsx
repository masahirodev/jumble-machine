import { createContext, useState, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";

import { Data, SubData } from "../../schema/data";
import { useComment } from "../../hooks/useComment";

export type AnalysisData = {
  attribute: string;
  value: string;
  count: number;
};

type AnalysisContextType = {
  blueprintDatas: Data[];
  exDatas: string[];
  analysisDatas: AnalysisData[];
  switchingDisplay: boolean;
  setSwitchingDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: ReactNode;
};

export const AnalysisContext = createContext<AnalysisContextType>(
  {} as AnalysisContextType
);

export const AnalysisProvider: React.FC<Props> = ({ children }) => {
  const [blueprintDatas] = useLoaderData() as [Data[]];

  const subDatas = blueprintDatas!!
    .map((blueprintData) => {
      return blueprintData.subDatas;
    })
    .flat();

  const exDatas = subDatas
    .map((subData) => subData.attribute)
    .flat()
    .filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });

  const analysisDatas = subDatas.reduce(
    (result: AnalysisData[], current: SubData) => {
      const element: AnalysisData | undefined = result.find((p) => {
        return p.attribute === current.attribute && p.value === current.value;
      });
      if (element) {
        element.count++;
      } else {
        result.push({
          attribute: current.attribute,
          value: current.value,
          count: 1,
        });
      }
      return result;
    },
    []
  );

  //コメント
  const { selectSetComment } = useComment();
  if (blueprintDatas === undefined) {
    selectSetComment("noAnalysisDatas");
  }

  //画面切替
  const [switchingDisplay, setSwitchingDisplay] = useState<boolean>(false);

  const value = {
    blueprintDatas,
    exDatas,
    analysisDatas,
    switchingDisplay,
    setSwitchingDisplay,
  };
  return (
    <>
      <AnalysisContext.Provider value={value}>
        {children}
      </AnalysisContext.Provider>
    </>
  );
};
