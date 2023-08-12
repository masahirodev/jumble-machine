import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useOperateIpc } from "../../hooks/useOperateIpc";
import { GlobalAlert } from "../../components/GlobalAlert";
import { CollectionData } from "../../schema/exportData";
import { useHandleForm } from "../../hooks/useHandleForm";

type Props = {
  projectId: number;
  setCollectionData: React.Dispatch<React.SetStateAction<CollectionData>>;
  collectionData: CollectionData;
};

export const ExportMetadata: React.FC<Props> = ({
  projectId,
  setCollectionData,
  collectionData,
}) => {
  const { handleEditData } = useHandleForm<CollectionData>({
    updateDatas: collectionData,
    setUpdateDatas: setCollectionData,
  });

  const { ipcStatus, setIpcStatus, alert, operateIpc } = useOperateIpc();

  // collection dataを保存して、JSONデータを出力する
  const saveExportXRPLJson = async () => {
    await operateIpc({
      ipc: "store",
      method: "set",
      arg: {
        name: String(projectId),
        key: "collection",
        value: collectionData,
      },
    });

    const fetch = await operateIpc({
      ipc: "operateShowOpen",
      method: "getFolder",
      arg: {},
    });

    if (fetch.status) {
      await operateIpc({
        ipc: "operateFastApi",
        method: "exportXRPLJson",
        arg: {
          projectId: projectId,
          folderPath: fetch.response as string,
        },
      });
    }
  };

  return (
    <>
      <Row>
        <Form className="align-items-center">
          <Form.Group as={Row} className="m-2">
            <Form.Label column>①コレクション情報を入力する</Form.Label>
          </Form.Group>
          <Form.Group as={Row} className="m-2">
            <Form.Label column className="col-2 ms-5">
              コレクションの名前
            </Form.Label>
            <Col className="col-8">
              <Form.Control
                type={"string"}
                name={"collectionName"}
                onChange={handleEditData}
                defaultValue={collectionData.collectionName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-2">
            <Form.Label column className="col-2 ms-5">
              コレクションの説明
            </Form.Label>
            <Col className="col-8">
              <Form.Control
                type={"string"}
                name={"collectionDescription"}
                onChange={handleEditData}
                defaultValue={collectionData.collectionDescription}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-2">
            <Form.Label column className="col-2 ms-5">
              コレクションのimageURL
            </Form.Label>
            <Col className="col-8">
              <Form.Control
                type={"string"}
                name={"collectionImage"}
                onChange={handleEditData}
                defaultValue={collectionData.collectionImage}
              />
            </Col>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Form className="align-items-center">
          <Form.Group as={Row} className="m-2">
            <Form.Label column className="col-11">
              ②JSONデータを出力する
            </Form.Label>
            <Col>
              <Button
                variant="primary"
                onClick={() => {
                  saveExportXRPLJson();
                }}
              >
                出力
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>

      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
