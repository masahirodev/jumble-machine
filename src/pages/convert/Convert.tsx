import { SpeechBalloons } from "../../components/SpeechBalloons";
import { GlobalAlert } from "../../components/GlobalAlert";
import { useState } from "react";
import { useOperateIpc } from "../../hooks/useOperateIpc";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ConvertConfig } from "./ConvertConfig";

type Props = {};

export const Convert: React.FC<Props> = () => {
  //コメント
  const initComment: string[] = [
    "ここでは、メタデータの情報を一括変換できるよ。",
  ];
  const [comment, setComment] = useState<string | string[]>(initComment);
  const { ipcStatus, setIpcStatus, alert, operateIpc } = useOperateIpc();

  return (
    <>
      <Container fluid className="px-5">
        <Row>
          <Col>
            <SpeechBalloons comment={comment} />
          </Col>
        </Row>
      </Container>
      <ConvertConfig setComment={setComment} operateIpc={operateIpc} />
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
