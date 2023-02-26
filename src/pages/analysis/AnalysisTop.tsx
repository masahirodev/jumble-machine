import { useContext } from "react";

import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { SubLayout } from "../../components/SubLayout";
import { AnalysisContext, AnalysisProvider } from "./AnalysisContext";
import { AnalysisSidebar } from "./AnalysisSidebar";

const AnalysisBuffer: React.FC = () => {
  const { blueprintDatas } = useContext(AnalysisContext);

  return (
    <GlobalLayoutContext
      buttonContents={undefined}
      mainContents={
        blueprintDatas[0]["id"] === -1 ? (
          <></>
        ) : (
          <SubLayout datas={blueprintDatas} Sidebar={<AnalysisSidebar />} />
        )
      }
    />
  );
};

export const AnalysisTop: React.FC = () => {
  return (
    <AnalysisProvider>
      <AnalysisBuffer />
    </AnalysisProvider>
  );
};
