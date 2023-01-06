import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { PreparationTopButton } from "./PreparationTopButton";
import { EditPrepData } from "./EditPrepData";
import { PrepProvider } from "./PrepContext";

export const PreparationTop = () => {
  return (
    <PrepProvider>
      <GlobalLayoutContext
        mainContents={<EditPrepData />}
        buttonContents={<PreparationTopButton />}
      />
    </PrepProvider>
  );
};
