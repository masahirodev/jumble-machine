import { Col } from "react-bootstrap";
import { SpeechBalloons } from "./SpeechBalloons";

import { useContext, useState } from "react";
import { LoginContext } from "../pages/common/LoginContext";
import { TopButton } from "../pages/top/TopButton";

export const CommentLayout = () => {
  const { membership } = useContext(LoginContext);

  const initComment: string = membership
    ? "今日は、どんなプロジェクトを作って楽しむ？"
    : "まずは、WalletConnectよりウォレットを接続してね。ウォレットが接続されると、接続したウォレットのアドレスを取得します。取得したアドレスを元にメンバーシップが有効か確認するよ。";

  const [comment, setComment] = useState<string | string[]>(initComment);

  return (
    <>
      <Col style={{ alignItems: "center", flex: "1" }}>
        <SpeechBalloons comment={"aaa"} />
      </Col>
      <Col className="col-4" style={{ display: "flex", justifyContent: "end" }}>
        <TopButton />
      </Col>
    </>
  );
};
