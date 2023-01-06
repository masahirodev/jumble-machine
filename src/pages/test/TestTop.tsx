import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { Test } from "./Test";

export const TestTop = () => {
  return (
    <>
      <GlobalLayoutContext buttonContents={undefined} mainContents={<Test />} />
    </>
  );
};
