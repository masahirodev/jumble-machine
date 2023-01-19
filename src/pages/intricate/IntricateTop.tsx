import { useContext } from "react";

import { IntricateProvider } from "./IntricateContext";
import { IntricateTopButton } from "./IntricateTopButton";
import { IntricateContext } from "./IntricateContext";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { SubLayout } from "../../components/SubLayout";
import { IntricateSidebar } from "./IntricateSidebar";

export const IntricateBuffer: React.FC = () => {
  const { intricateDatas } = useContext(IntricateContext);

  return (
    <GlobalLayoutContext
      buttonContents={<IntricateTopButton />}
      mainContents={
        <SubLayout datas={intricateDatas} Sidebar={<IntricateSidebar />} />
      }
    />
  );
};

export const IntricateTop: React.FC = () => {
  return (
    <IntricateProvider>
      <IntricateBuffer />
    </IntricateProvider>
  );
};
