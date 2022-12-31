import { Buffer } from "buffer";

import { Start } from "./Start";
import { GlobalLayoutContext } from "../../components/GlobalLayoutContext";

import { Web3ReactProvider } from "@web3-react/core";

import { Login } from "./Login";
import connectors from "../../utils/connectors";

export const Top: React.FC = () => {
  // @ts-ignore
  window.Buffer = Buffer;

  return (
    <>
      <Web3ReactProvider connectors={connectors}>
        <GlobalLayoutContext
          mainContents={<Start />}
          buttonContents={<Login />}
        />
      </Web3ReactProvider>
    </>
  );
};
