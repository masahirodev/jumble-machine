import { SpeechBalloons } from "../../components/SpeechBalloons";
import { GlobalAlert } from "../../components/GlobalAlert";
import { useState } from "react";
import { useOperateIpc } from "../../hooks/useOperateIpc";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ImportData } from "./ImportData";
import { Step } from "../../components/Step";
import { ExportData } from "./ExportData";

export const Other: React.FC = () => {
  //コメント
  const initComment: string[] = [
    "ここでは、 データを取り出したり、データを取り込むことができるよ。",
    "今編集しているプロジェクトに上書きすることになるから注意してね。",
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
      <Container>
        <Step
          title={"データを取り出す"}
          children={
            <ExportData setComment={setComment} operateIpc={operateIpc} />
          }
          size={"min"}
        />
      </Container>
      <Container className="py-3">
        <Step
          title={"データを取り込む"}
          children={
            <ImportData setComment={setComment} operateIpc={operateIpc} />
          }
          size={"min"}
        />
      </Container>
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
