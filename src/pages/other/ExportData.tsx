import { useLoaderData } from "react-router-dom";

import { OperateIpc, ReturnOperateIpc } from "../../schema/ipc";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { tableHeader } from "../../schema/tableHeader";

type Props = {
  operateIpc: ({ ipc, method, arg }: OperateIpc) => Promise<ReturnOperateIpc>;
};

//TODO コメント
export const ExportData: React.FC<Props> = ({ operateIpc }) => {
  const [projectId] = useLoaderData() as [number];

  //blueprintデータを取り出す
  const exportData = async (format: "excel" | "csv") => {
    const fetch = await window.electronApi.operateShowOpen({
      method: "getFolder",
      arg: {},
    });
    if (fetch.status) {
      await operateIpc({
        ipc: "operateFastApi",
        method: "exportData",
        arg: {
          projectId: projectId,
          sortList: tableHeader,
          exportPath: fetch.response as string,
          export_format: format,
        },
      });
    }
  };

  const htmlSet = [
    {
      title: "excelファイルでblueprintデータを取り出す",
      func: () => exportData("excel"),
    },
    {
      title: "csvファイルでblueprintデータを取り出す",
      func: () => exportData("csv"),
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
