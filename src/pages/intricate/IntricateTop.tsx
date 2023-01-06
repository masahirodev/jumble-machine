import { IntricateProvider } from "./IntricateContext";
import { IntricateTopButton } from "./IntricateTopButton";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { SubLayout } from "../../components/SubLayout";

export const IntricateTop: React.FC = () => {
  return (
    <IntricateProvider>
      <GlobalLayoutContext
        buttonContents={<IntricateTopButton />}
        mainContents={<SubLayout />}
      />
    </IntricateProvider>
  );
};
