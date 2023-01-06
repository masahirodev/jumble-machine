import { BlueprintProvider } from "./BlueprintContext";
import { BlueprintTopButton } from "./BlueprintTopButton";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { Blueprint } from "./Blueprint";

export const BlueprintTop: React.FC = () => {
  return (
    <BlueprintProvider>
      <GlobalLayoutContext
        buttonContents={<BlueprintTopButton />}
        mainContents={<Blueprint />}
      />
    </BlueprintProvider>
  );
};
