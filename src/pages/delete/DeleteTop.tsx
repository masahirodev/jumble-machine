import { useContext } from "react";

import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { SubLayout } from "../../components/SubLayout";
import { DeleteContext, DeleteProvider } from "./DeleteContext";
import { DeleteSidebar } from "./DeleteSidebar";

const DeleteBuffer: React.FC = () => {
  const { blueprintDatas } = useContext(DeleteContext);

  return (
    <GlobalLayoutContext
      buttonContents={undefined}
      mainContents={
        blueprintDatas[0]["id"] === -1 ? (
          <></>
        ) : (
          <SubLayout datas={blueprintDatas} Sidebar={<DeleteSidebar />} />
        )
      }
    />
  );
};

export const DeleteTop: React.FC = () => {
  return (
    <DeleteProvider>
      <DeleteBuffer />
    </DeleteProvider>
  );
};
