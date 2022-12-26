import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { DesignButton } from "./DesignButton";
import { DesignConfig } from "./DesignConfig";
import { DesignProvider } from "./DesignContext";

export const DesignTop = () => {
  return (
    <DesignProvider>
      <GlobalLayoutContext
        mainContents={<DesignConfig />}
        buttonContents={<DesignButton />}
      />
    </DesignProvider>
  );
};
