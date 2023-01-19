import { useContext } from "react";

import type { IntricateDataType } from "../../../../schema/intricate";
import { IntricateContext } from "../../IntricateContext";
import { GlobalAlert } from "../../../../components/GlobalAlert";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useOperateIpc } from "../../../../hooks/useOperateIpc";

export const DataConfig = () => {
  const { projectId, setIntricateDatas } = useContext(IntricateContext);
  const { ipcStatus, setIpcStatus, alert, operateIpc } = useOperateIpc();

  //Excelデータを出力する
  const exportIntricateDatas = async () => {
    const fetch = await operateIpc({
      ipc: "operateShowOpen",
      method: "getFolder",
      arg: {},
    });

    if (fetch.status) {
      await operateIpc({
        ipc: "operateFastApi",
        method: "exportIntricateDatas",
        arg: {
          projectId: projectId,
          exportFolderPath: fetch.response as string,
        },
      });
      const datas: IntricateDataType[] = await window.storeApi.getStoreValue(
        String(projectId),
        "intricateDatas"
      );
      setIntricateDatas(datas);
    }
  };

  //Excelデータを読み込む
  //const importIntricateDatas = async () => {
  //  const fetch = await window.electronApi.operateShowOpen({
  //    method: "getFile",
  //    arg: {
  //      fileName: "エクセルファイル",
  //      extension: "xlsx",
  //    },
  //  });
  //  if (fetch.status) {
  //    await operateIpc({
  //      ipc: "operateFastApi",
  //      method: "importIntricateDatas",
  //      arg: {
  //        projectId: projectId,
  //        filePath: fetch.response as string,
  //      },
  //    });
  //  }
  //};

  return (
    <>
      <Container fluid className="py-3">
        <Row className="py-3">
          <Col>
            <Button onClick={exportIntricateDatas}>
              excelファイルにてIntricateデータを取り出す
            </Button>
          </Col>
        </Row>
        {/*
        <Row>
          <Col>
            <Button onClick={importIntricateDatas}>
              excelファイルのIntricateデータを取り込む
            </Button>
          </Col>
        </Row>
        */}
      </Container>
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
