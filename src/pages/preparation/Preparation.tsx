import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { linkTo } from "../../hooks/linkTo";
import { SpeechBalloons } from "../../components/SpeechBalloons";
import { EditPrepData } from "./EditPrepData";
import { initPrepData, PrepData } from "../../schema/prepData";
import { GlobalAlert } from "../../components/GlobalAlert";
import { useOperateIpc } from "../../hooks/useOperateIpc";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { checkConfirmation } from "../../hooks/checkConfirmation";

export const Preparation: React.FC = () => {
  const [savedPrepData, maxQuantity, projectId] = useLoaderData() as [
    PrepData,
    number,
    number
  ];
  const [prepData, setPrepData] = useState<PrepData>(
    savedPrepData === undefined ? initPrepData : savedPrepData
  );

  //コメント
  const initComment: string[] = [
    "ここでは、メタデータに書き込む情報を入力しよう！",
    "次のステップでは、個別でメタデータを編集したり、エクセルに出力して編集することもできるよ。",
  ];
  const [comment, setComment] = useState<string | string[]>(initComment);
  const { ipcStatus, setIpcStatus, alert, operateIpc } = useOperateIpc();

  //データを保存する
  const saveData = async () => {
    await operateIpc({
      ipc: "store",
      method: "set",
      arg: {
        name: String(projectId),
        key: "prep",
        value: prepData,
      },
    });
  };

  //データを上書きする
  const checkAndSave = async () => {
    checkConfirmation(projectId, "prep", () => saveData());
  };

  //次へ
  const next = async (method: "jumble" | "intricateJumble") => {
    checkConfirmation(projectId, "blueprint", () => jumbleFunc(method));
  };

  const jumbleFunc = async (method: "jumble" | "intricateJumble") => {
    await saveData();
    const fetch = await operateIpc({
      ipc: "operateFastApi",
      method: method,
      arg: {
        projectId: projectId,
      },
    });
    if (fetch.status) {
      linkTo("blueprint");
    }
  };

  return (
    <>
      <Container fluid className="px-5">
        <Row>
          <Col>
            <SpeechBalloons comment={comment} />
          </Col>
          <Col className="col-4 d-flex align-items-center justify-content-end">
            <Button
              className={"me-3"}
              onClick={() => next("intricateJumble")}
              onMouseEnter={() =>
                setComment([
                  "メタデータに書き込むデータの設定が終わったら、次へを押してね。",
                  "次へを押すと、ここで設定したデータが保存されて、次のステップに進むよ。",
                ])
              }
            >
              intricate function
            </Button>
            <Button
              variant="success"
              type="button"
              onClick={checkAndSave}
              className={"me-3"}
              onMouseEnter={() =>
                setComment([
                  "編集が終わったら、必ず保存ボタンを押してね。",
                  "今は、あえて、自動保存には対応してないんだ。",
                ])
              }
            >
              データを保存
            </Button>
            <Button
              onClick={() => next("jumble")}
              onMouseEnter={() =>
                setComment([
                  "メタデータに書き込むデータの設定が終わったら、次へを押してね。",
                  "次へを押すと、ここで設定したデータが保存されて、次のステップに進むよ。",
                ])
              }
            >
              次へ
            </Button>
          </Col>
        </Row>
      </Container>
      <EditPrepData
        prepData={prepData}
        setPrepData={setPrepData}
        setComment={setComment}
        maxQuantity={maxQuantity}
      />
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
