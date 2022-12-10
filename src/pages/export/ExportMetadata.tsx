import ExcelJS from "exceljs";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Data } from "../../schema/data";
import { tableHeader } from "../../schema/tableHeader";
import { useOperateIpc } from "../../hooks/useOperateIpc";
import { GlobalAlert } from "../../components/GlobalAlert";

type Props = {
  projectId: number;
};

export const ExportMetadata: React.FC<Props> = ({ projectId }) => {
  const { ipcStatus, setIpcStatus, alert, operateIpc } = useOperateIpc();

  //JSONデータを出力する
  const exportJson = async () => {
    const fetch = await operateIpc({
      ipc: "operateShowOpen",
      method: "getFolder",
      arg: {},
    });
    if (fetch.status) {
      await operateIpc({
        ipc: "operateFastApi",
        method: "exportJson",
        arg: {
          projectId: projectId,
          folderPath: fetch.response as string,
        },
      });
    } else {
      setIpcStatus("stop");
    }
  };

  //TODO バックエンドへ移行
  //エクセルで出力する
  const exportCSV = async (header: string[]) => {
    const workbook = new ExcelJS.Workbook();
    const sheetName = "export";
    workbook.addWorksheet(sheetName);
    const arraySheet = workbook.getWorksheet(sheetName);

    const blueprintDatas: Data[] = await window.storeApi.getStoreValue(
      String(projectId),
      "blueprint"
    );

    const exData = blueprintDatas
      .map((blueprintData) => {
        return blueprintData.subDatas.map((subData) => subData.attribute);
      })
      .flat()
      .filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });

    const exportBlueprint = blueprintDatas.map((blueprintData) => {
      let exportDatas = { ...blueprintData };
      if (blueprintData["subDatas"] === undefined) {
      } else {
        for (let i = 0; i < blueprintData["subDatas"].length; i++) {
          exportDatas = {
            ...exportDatas,
            ...{
              [blueprintData["subDatas"][i].attribute]:
                blueprintData["subDatas"][i].value,
            },
          };
        }
      }
      return exportDatas;
    });

    const mainHeader = header.map((value) => {
      return { header: value, key: value };
    });

    const subHeader = exData.map((value) => {
      return { header: value, key: value };
    });
    arraySheet.columns = mainHeader.concat(subHeader);
    arraySheet.addRows(exportBlueprint);

    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/octet-binary",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "metadata.csv";
    a.click();
    a.remove();
  };

  //metadataの整理
  const thirdwebSet1: string[] = ["id", "imagePath"];
  const thirdwebSet2: string[] = thirdwebSet1.concat("image", "animation_url");

  const makeHeader = (deleteList: string[]) => {
    const newHeader = tableHeader.filter(
      (value) => deleteList.indexOf(value) === -1
    );
    exportCSV(newHeader);
  };

  const htmlSet = [
    { title: "JSONデータを出力する", func: () => exportJson() },
    {
      title: "thirdweb用のmetadata : 画像データのアップロードを自分で行う場合",
      func: () => makeHeader(thirdwebSet1),
    },
    {
      title:
        "thirdweb用のmetadata : 画像データのアップロードをthirdwebを通してipfsサーバーにする場合",
      func: () => makeHeader(thirdwebSet2),
    },
  ];

  return (
    <>
      <Container className="p-2">
        {htmlSet.map((value, index) => {
          return (
            <Row className="py-2 px-3 align-items-center" key={index}>
              <Col className={"col-8"}>{value.title}</Col>
              <Col>
                <Button variant="primary" onClick={value.func}>
                  出力
                </Button>
              </Col>
            </Row>
          );
        })}
      </Container>

      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
