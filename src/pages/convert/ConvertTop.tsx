import { useLoaderData } from "react-router-dom";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { useComment } from "../../hooks/useComment";
import { Data } from "../../schema/data";
import { ConvertConfig } from "./ConvertConfig";

export const ConvertTop: React.FC = () => {
  const [data] = useLoaderData() as [Data[]];
  const { selectSetComment } = useComment();

  if (data === undefined) {
    selectSetComment("noBlueprintDatas");
  }
  return (
    <GlobalLayoutContext
      buttonContents={undefined}
      mainContents={data && <ConvertConfig />}
    />
  );
};
