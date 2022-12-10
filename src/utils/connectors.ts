import { Web3ReactHooks } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import { hooks as walletConnectHooks, walletConnect } from "./walletConnect";

const connectors: [WalletConnect, Web3ReactHooks][] = [
  [walletConnect, walletConnectHooks],
];

export default connectors;
