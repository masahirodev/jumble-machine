import { BlueprintProvider } from "./BlueprintContext";
import { BlueprintTopButton } from "./BlueprintTopButton";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { Blueprint } from "./Blueprint";
import { useLoaderData } from "react-router-dom";
import { BlueprintData } from "../../schema/blueprintData";

export const BlueprintTop: React.FC = () => {
  const { dbBlueprintDatas } = useLoaderData() as {
    dbBlueprintDatas: BlueprintData[];
  };

  return (
    <BlueprintProvider>
      <GlobalLayoutContext
        buttonContents={
          dbBlueprintDatas[0]["id"] === -1 ? undefined : <BlueprintTopButton />
        }
        mainContents={
          dbBlueprintDatas[0]["id"] === -1 ? undefined : <Blueprint />
        }
      />
    </BlueprintProvider>
  );
};
