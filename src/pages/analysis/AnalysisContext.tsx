import { createContext, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";

import { BlueprintData, SubData } from "../../schema/blueprintData";
import { useCheckBlueprintDatas } from "../../hooks/useCheckBlueprintDatas";

export type AnalysisData = {
  attribute: string;
  value: string;
  count: number;
};

type AnalysisContextType = {
  blueprintDatas: BlueprintData[];
  exDatas: string[];
  analysisDatas: AnalysisData[];
};

type Props = {
  children: ReactNode;
};

export const AnalysisContext = createContext<AnalysisContextType>(
  {} as AnalysisContextType
);

export const AnalysisProvider: React.FC<Props> = ({ children }) => {
  const { blueprintDatas } = useLoaderData() as {
    blueprintDatas: BlueprintData[];
  };

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

  useCheckBlueprintDatas({ blueprintDatas });

  const value = {
    blueprintDatas,
    exDatas,
    analysisDatas,
  };
  return (
    <>
      <AnalysisContext.Provider value={value}>
        {children}
      </AnalysisContext.Provider>
    </>
  );
};
