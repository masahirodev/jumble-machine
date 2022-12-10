import { walletConnect } from "../utils/walletConnect";

export const disconnect = async () => {
  const connector = walletConnect;
  localStorage.removeItem("connectorId");
  localStorage.removeItem("walletconnect");
  localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
  if (connector.deactivate) {
    connector.deactivate();
  } else {
    connector.resetState();
  }
};
