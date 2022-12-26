import { useContext } from "react";
import { Buffer } from "buffer";

import { Start } from "./Start";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";
import { TopButton } from "./TopButton";

export const Top: React.FC = () => {
  // @ts-ignore
  window.Buffer = Buffer;

  return (
    <>
      <GlobalLayoutContext
        mainContents={<Start />}
        buttonContents={<TopButton />}
      />
    </>
  );
};
