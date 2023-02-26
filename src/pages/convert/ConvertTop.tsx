import { useLoaderData } from "react-router-dom";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { useCheckBlueprintDatas } from "../../hooks/useCheckBlueprintDatas";
import { BlueprintData } from "../../schema/blueprintData";
import { ConvertConfig } from "./ConvertConfig";

export const ConvertTop: React.FC = () => {
  const { blueprintDatas } = useLoaderData() as {
    blueprintDatas: BlueprintData[];
  };

  useCheckBlueprintDatas({ blueprintDatas });
  return (
    <GlobalLayoutContext
      buttonContents={undefined}
      mainContents={blueprintDatas[0]["id"] === -1 ? <></> : <ConvertConfig />}
    />
  );
};
