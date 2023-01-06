import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { Other } from "./Other";

export const OtherTop: React.FC = () => {
  return (
    <GlobalLayoutContext buttonContents={undefined} mainContents={<Other />} />
  );
};
