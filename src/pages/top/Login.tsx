import { useWeb3React } from "@web3-react/core";

import { ConnectButton } from "./ConnectButton";

import walletconnect_Logo from "../../assets/walletconnect.svg";
import { walletConnect } from "../../utils/walletConnect";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../common/LoginContext";
import { contractSet } from "../../utils/contractSet";
import { useMembership } from "../../hooks/useMembership";
import { getEllipsisTxt } from "../../hooks/getEllipsisTxt";
import { disconnect } from "../../hooks/disconnect";
import { GlobalAlert } from "../../components/GlobalAlert";
import { useComment } from "../../hooks/useComment";

export const Login: React.FC = () => {
  const { account } = useWeb3React();
  const { setMembership } = useContext(LoginContext);
  const [hovered, setHovered] = useState<boolean>(false);

  const accountTxt = getEllipsisTxt(account === undefined ? "" : account, 6);

  //承認機能;
  const { checkMembership, status, setStatus, alert } = useMembership({
    ...{ account: account !== undefined ? account : "" },
    ...contractSet.polygon,
  });

  const { selectSetComment } = useComment();
  //TODO useEffect適切ではない気がする
  useEffect(() => {
    if (checkMembership === undefined) {
      //      selectSetComment("loginNotConnect");
    } else {
      setMembership(checkMembership);
      if (account !== undefined) {
        checkMembership
          ? selectSetComment("loginSuccess")
          : selectSetComment("loginFalse");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkMembership, account]);

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        {account === undefined ? (
          <ConnectButton
            label="WalletConnect"
            image={walletconnect_Logo}
            onClick={async () => {
              await walletConnect.activate();
            }}
          />
        ) : (
          <Button
            variant="primary"
            onClick={() => disconnect()}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered ? "接続を解除する" : accountTxt}
          </Button>
        )}
      </Container>
      <GlobalAlert ipcStatus={status} setIpcStatus={setStatus} alert={alert} />
    </>
  );
};
