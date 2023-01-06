import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { Export } from "./Export";

export const ExportTop: React.FC = () => {
  return (
    <GlobalLayoutContext buttonContents={undefined} mainContents={<Export />} />
  );
};
