import { useContext, useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Buffer } from "buffer";

import { Start } from "./Start";
import { Login } from "./Login";
import { LoginContext } from "../common/LoginContext";
import connectors from "../../utils/connectors";
import { SpeechBalloons } from "../../components/SpeechBalloons";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const Top: React.FC = () => {
  // @ts-ignore
  window.Buffer = Buffer;

  const { membership } = useContext(LoginContext);

  const initComment: string = membership
    ? "今日は、どんなプロジェクトを作って楽しむ？"
    : "まずは、WalletConnectよりウォレットを接続してね。ウォレットが接続されると、接続したウォレットのアドレスを取得します。取得したアドレスを元にメンバーシップが有効か確認するよ。";

  const [comment, setComment] = useState<string | string[]>(initComment);

  return (
    <>
      <Container fluid className="px-5">
        <Row>
          <Col>
            <SpeechBalloons comment={comment} />
          </Col>
          <Col className="col-4 d-flex align-items-center justify-content-end">
            <Web3ReactProvider connectors={connectors}>
              <Login setComment={setComment} />
            </Web3ReactProvider>
          </Col>
        </Row>
      </Container>
      {membership && <Start />}
    </>
  );
};
