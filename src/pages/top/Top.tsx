import { Start } from "./Start";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";

export const Top: React.FC = () => {
  return (
    <>
      <GlobalLayoutContext
        mainContents={<Start />}
        buttonContents={undefined}
      />
    </>
  );
};
