import { useLoaderData } from "react-router-dom";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { Export } from "./ExportXRPL";

export const ExportXRPTop: React.FC = () => {
  const { hasBlueprint } = useLoaderData() as {
    hasBlueprint: boolean;
  };

  return (
    <GlobalLayoutContext
      buttonContents={undefined}
      mainContents={hasBlueprint ? <Export /> : undefined}
    />
  );
};
