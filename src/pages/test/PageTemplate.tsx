//TODO テンプレート化
import { SpeechBalloons } from "../../components/SpeechBalloons";
import { GlobalAlert } from "../../components/GlobalAlert";
import { useState } from "react";
import { useOperateIpc } from "../../hooks/useOperateIpc";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type Props = {
  button: JSX.Element;
  contents: JSX.Element;
};

export const PageTemplate: React.FC<Props> = ({ button, contents }) => {
  //TODO コメントuseReducerなどで外だし
  const initComment: string[] = ["ここでは、データを取り込むことができるよ。"];
  const [comment, setComment] = useState<string | string[]>(initComment);
  const { ipcStatus, setIpcStatus, alert, operateIpc } = useOperateIpc();

  return (
    <>
      <Container fluid className="px-5">
        <Row>
          <Col>
            <SpeechBalloons comment={comment} />
          </Col>
          <Col className="col-4 d-flex align-items-center justify-content-end">
            {button}
          </Col>
        </Row>
      </Container>
      {contents}
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
