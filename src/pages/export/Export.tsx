import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { SpeechBalloons } from "../../components/SpeechBalloons";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { ExportImage } from "./ExportImage";
import { Step } from "../../components/Step";
import { SaveImage, serverSets } from "./SaveImage";
import { ExportMetadata } from "./ExportMetadata";
import { initExportData, ExportData } from "../../schema/exportData";
import { GlobalAlert } from "../../components/GlobalAlert";
import { useOperateIpc } from "../../hooks/useOperateIpc";
import { useHandleForm } from "../../hooks/useHandleForm";

export const Export: React.FC = () => {
  const [savedExportData, projectId, hasBlueprint] = useLoaderData() as [
    ExportData,
    number,
    boolean
  ];
  const [exportData, setExportData] = useState<ExportData>(
    savedExportData !== undefined ? savedExportData : initExportData
  );
  const { ipcStatus, setIpcStatus, alert, operateIpc } = useOperateIpc();

  //データを保存する
  const saveData = async () => {
    await operateIpc({
      ipc: "store",
      method: "set",
      arg: { name: String(projectId), key: "export", value: exportData },
    });
  };

  //コメント
  const initComment: string = hasBlueprint
    ? "ここでは、NFTにするために必要なデータの整理を行っていくよ。"
    : "まずは、ジェネラティブしてね！";

  const [comment, setComment] = useState<string | string[]>(initComment);

  const { handleEditData, handleSelectData, handleCheckData, handleSetData } =
    useHandleForm<ExportData>({
      updateDatas: exportData,
      setUpdateDatas: setExportData,
    });

  //画像データ整理
  const adjustImage = async () => {
    const fetch = await operateIpc({
      ipc: "operateShowOpen",
      method: "getFolder",
      arg: {},
    });

    if (fetch.status) {
      const fetchIpc = await operateIpc({
        ipc: "operateFastApi",
        method: "adjustImage",
        arg: {
          projectId: projectId,
          name: exportData.name,
          tokenId: exportData.startTokenId,
          exportPath: fetch.response as string,
        },
      });
      if (fetchIpc.status) {
        handleSetData<number>("step", 2);
        saveData();
      }
    }
  };

  //パス取得
  const path = (server: string, hash: string, name: string) => {
    return (
      serverSets.filter((serverSets) => serverSets.name === server)[0].domain +
      hash +
      "/" +
      name
    );
  };

  //メタデータ修正
  const saveImage = async () => {
    const fetch = await operateIpc({
      ipc: "operateFastApi",
      method: "saveImage",
      arg: {
        projectId: projectId,
        img: exportData.img,
        imgPath: path(
          exportData.imgServer,
          exportData.imgHash,
          exportData.name
        ),
        ani: exportData.ani,
        aniPath: path(
          exportData.aniServer,
          exportData.aniHash,
          exportData.name
        ),
      },
    });
    if (fetch.status) {
      handleSetData<number>("step", 3);
      saveData();
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
              variant="success"
              type="button"
              onClick={saveData}
              className={"me-3"}
              onMouseEnter={() =>
                setComment([
                  "編集が終わったら、必ず保存ボタンを押してね。今は、あえて、自動保存には対応してないんだ。",
                ])
              }
            >
              データを保存
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Step
          title={"Step1.画像データを整理する"}
          children={
            <ExportImage
              handleEditData={handleEditData}
              exportData={exportData}
              adjustImage={adjustImage}
            />
          }
          color={exportData.step === 1 ? "#0d6efd" : ""}
          size={"min"}
        />
      </Container>
      <Container className="py-3">
        <Step
          title={"Step2.サーバーにデータを保存する"}
          children={
            <SaveImage
              handleEditData={handleEditData}
              handleSelectData={handleSelectData}
              handleCheckData={handleCheckData}
              exportData={exportData}
              saveImage={saveImage}
            />
          }
          color={exportData.step === 2 ? "#0d6efd" : ""}
          size={"min"}
        />
      </Container>
      <Container>
        <Step
          title={"Step3.メタデータを出力する"}
          children={<ExportMetadata projectId={projectId} />}
          color={exportData.step === 3 ? "#0d6efd" : ""}
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
