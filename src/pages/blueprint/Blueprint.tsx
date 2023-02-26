import { useContext } from "react";

import { BlueprintTable } from "./BlueprintTable";
import { PaginationComponents } from "./PaginationComponents";
import { BlueprintContext } from "./BlueprintContext";

export const Blueprint: React.FC = () => {
  const { blueprintDatas, switchingDisplay } = useContext(BlueprintContext);

  return (
    <>
      {blueprintDatas[0]["id"] !== -1 && (
        <>
          <BlueprintTable switchingDisplay={switchingDisplay} />
          <PaginationComponents />
        </>
      )}
    </>
  );
};
