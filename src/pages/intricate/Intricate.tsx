import { IntricateContext } from "./IntricateContext";
import { useContext } from "react";
import { IntricateTopButton } from "./IntricateTopButton";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { SubLayout } from "../../components/SubLayout";

export const Intricate: React.FC = () => {
  const { intricateDatas } = useContext(IntricateContext);

  return (
    <GlobalLayoutContext
      buttonContents={<IntricateTopButton />}
      mainContents={<>{intricateDatas !== undefined && <SubLayout />}</>}
    />
  );
};
