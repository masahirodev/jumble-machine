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

type ConnectButtonType = {
  setComment: React.Dispatch<React.SetStateAction<string | string[]>>;
};

export const Login: React.FC<ConnectButtonType> = ({ setComment }) => {
  const { account } = useWeb3React();
  const { setMembership } = useContext(LoginContext);
  const [hovered, setHovered] = useState<boolean>(false);

  const accountTxt = getEllipsisTxt(account === undefined ? "" : account, 6);

  //承認機能;
  const { checkMembership, status, setStatus, alert } = useMembership({
    ...{ account: account !== undefined ? account : "" },
    ...contractSet.polygon,
  });

  //TODO useEffect適切ではない気がする
  useEffect(() => {
    if (checkMembership === undefined) {
      setComment("ブロックチェーンにつながらないみたい・・・");
    } else {
      setMembership(checkMembership);
      if (account !== undefined) {
        checkMembership
          ? setComment(
              "メンバーシップへようこそ！もうウォレットの接続を解除しても大丈夫なので、右側のボタンを押して接続を解除してもいいよ。"
            )
          : setComment(
              "このアドレスは、メンバーシップが有効じゃないみたい・・・"
            );
      }
    }
  }, [checkMembership, account, setComment, setMembership]);

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
