import { Web3ReactProvider } from "@web3-react/core";

import { Login } from "./Login";
import connectors from "../../utils/connectors";

export const TopButton: React.FC = () => {
  return (
    <>
      <Web3ReactProvider connectors={connectors}>
        <Login />
      </Web3ReactProvider>
    </>
  );
};
