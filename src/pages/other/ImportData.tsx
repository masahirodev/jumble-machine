import { useLoaderData } from "react-router-dom";

import { OperateIpc, ReturnOperateIpc } from "../../schema/ipc";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { tableHeader } from "../../schema/tableHeader";
import { checkConfirmation } from "../../hooks/checkConfirmation";

type Props = {
  operateIpc: ({ ipc, method, arg }: OperateIpc) => Promise<ReturnOperateIpc>;
};

//TODO コメント
export const ImportData: React.FC<Props> = ({ operateIpc }) => {
  const [projectId] = useLoaderData() as [number];

  //Excelデータを読み込む
  const importExcel = async () => {
    const fetch = await window.electronApi.operateShowOpen({
      method: "getFile",
      arg: {
        fileName: "エクセルファイル",
        extension: "xlsx",
      },
    });
    if (fetch.status) {
      await operateIpc({
        ipc: "operateFastApi",
        method: "importExcel",
        arg: {
          projectId: projectId,
          filePath: fetch.response as string,
          sortList: tableHeader,
        },
      });
    }
  };

  //JSONデータを読み込む
  const importJson = async () => {
    const fetch = await window.electronApi.operateShowOpen({
      method: "getFolder",
      arg: {},
    });
    if (fetch.status) {
      await operateIpc({
        ipc: "operateFastApi",
        method: "importJson",
        arg: {
          projectId: projectId,
          folderPath: fetch.response as string,
        },
      });
    }
  };

  const htmlSet = [
    {
      title: "excelファイルからデータを取り込む",
      func: () =>
        checkConfirmation(projectId, "blueprint", () => importExcel()),
    },
    {
      title: "複数のJsonファイルからデータを取り込む",
      func: () => checkConfirmation(projectId, "blueprint", () => importJson()),
    },
  ];

  return (
    <Container className="p-2">
      {htmlSet.map((value, index) => {
        return (
          <Row className="py-2 px-3 align-items-center" key={index}>
            <Col className={"col-8"}>{value.title}</Col>
            <Col>
              <Button variant="primary" onClick={value.func}>
                実行
              </Button>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};
