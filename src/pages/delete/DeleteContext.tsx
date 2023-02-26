import { createContext, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";

import { BlueprintData, SubData } from "../../schema/blueprintData";
import { DeleteDatas, DeletePairData } from "../../schema/deleteData";
import { useCheckBlueprintDatas } from "../../hooks/useCheckBlueprintDatas";

export type DeleteData = {
  attribute: string;
  value: string;
  count: number;
};

type DeleteContextType = {
  blueprintDatas: BlueprintData[];
  exDatas: string[];
  bundleSubDatas: DeleteData[];
  deletePairDatas: DeletePairData[];
};

type Props = {
  children: ReactNode;
};

export const DeleteContext = createContext<DeleteContextType>(
  {} as DeleteContextType
);

export const DeleteProvider: React.FC<Props> = ({ children }) => {
  const { blueprintDatas, deleteDatas } = useLoaderData() as {
    blueprintDatas: BlueprintData[];
    deleteDatas: DeleteDatas;
    projectId: number;
  };

  const subDatas = blueprintDatas
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

  const bundleSubDatas = subDatas.reduce(
    (result: DeleteData[], current: SubData) => {
      const element: DeleteData | undefined = result.find((p) => {
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

  const deletePairDatas: DeletePairData[] = deleteDatas["deletePairDatas"];

  const value = {
    blueprintDatas,
    exDatas,
    bundleSubDatas,
    deletePairDatas,
  };
  return (
    <>
      <DeleteContext.Provider value={value}>{children}</DeleteContext.Provider>
    </>
  );
};
