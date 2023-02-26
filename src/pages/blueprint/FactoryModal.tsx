import { useContext, useEffect, useState } from "react";

import { BlueprintContext } from "./BlueprintContext";
import { useOperateIpc } from "../../hooks/useOperateIpc";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

type Props = {
  show: boolean;
  onHide: () => void;
};

export type FactoryData = {
  [key: string]: number | string;
  start: number;
  stop: number;
  exportPath: string;
};

export const FactoryModal: React.FC<Props> = ({ show, onHide }) => {
  const { blueprintDatas, setBlueprintDatas, projectId, exportPath, saveData } =
    useContext(BlueprintContext);

  //合成中の表示画面
  const [runFactory, setRunFactory] = useState<boolean>(false);
  const [runNumber, setRunNumber] = useState<number>(0);
  const [completedImage, setCompletedImage] = useState<string>("");

  //TODO 運用変更中
  //最大最小
  //  const arrayId = blueprintDatas
  //    .filter(
  //      (blueprintData) =>
  //        blueprintData.imagePath === "" || blueprintData.imagePath === undefined
  //    )
  //    .map((blueprintData) => blueprintData.id);
  //
  //  //TODO最大値・最小値オーバーフロー
  //  const maxId =
  //    arrayId[arrayId.length - 1] !== undefined ? arrayId[arrayId.length - 1] : 0;
  //  const minId = arrayId[0] !== undefined ? arrayId[0] : 0;

  const minId = blueprintDatas[0]["id"];
  const maxId = blueprintDatas[blueprintDatas.length - 1]["id"];

  const initFactoryData = {
    start: minId,
    stop: maxId,
    exportPath: exportPath === undefined ? "" : exportPath,
  };

  const [factoryData, setFactoryData] = useState<FactoryData>(initFactoryData);

  useEffect(() => {
    setFactoryData(initFactoryData);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blueprintDatas]);

  //入力フォーム用
  const handleEditData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (typeof factoryData[name] === "number") {
      setFactoryData({ ...factoryData, [name]: Number(value) });
    } else {
      setFactoryData({ ...factoryData, [name]: value });
    }
  };

  const { operateIpc } = useOperateIpc();

  //フォルダ取得
  const getFolder = async (target: string) => {
    const fetch = await operateIpc({
      ipc: "operateShowOpen",
      method: "getFolder",
      arg: {},
    });
    if (fetch.status) {
      const path = fetch.response as string;
      setFactoryData({ ...factoryData, [target]: path });

      await operateIpc({
        ipc: "store",
        method: "set",
        arg: {
          name: String(projectId),
          key: "exportPath",
          value: path,
        },
      });
    }
  };

  //TODO 見直したい
  //画像合成
  const startFactory = async () => {
    if (
      factoryData.start >= 0 &&
      factoryData.start >= minId &&
      factoryData.start < factoryData.stop &&
      factoryData.stop > 0 &&
      factoryData.stop <= maxId &&
      factoryData.exportPath !== ""
    ) {
      setRunFactory(true);
      const factory = async (i: number) => {
        try {
          const fetch = await operateIpc({
            ipc: "operateFastApi",
            method: "factory",
            arg: {
              projectId: projectId,
              i: i,
              exportPath: factoryData.exportPath,
            },
          });

          const result = fetch.response as string;
          setCompletedImage(result);
          blueprintDatas.filter((blueprintData) => blueprintData.id === i)[0][
            "imagePath"
          ] = result;

          setBlueprintDatas(blueprintDatas);
        } catch (e) {
          console.log(e);
        }
      };
      for (let i = factoryData.start; i < factoryData.stop + 1; i++) {
        setRunNumber(i);
        await factory(i);
      }
      saveData();
    } else {
      alert("入力内容がおかしいよ");
    }
    setRunFactory(false);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        !runFactory && onHide();
      }}
      centered
    >
      {runFactory === false ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>画像合成の設定</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="align-items-center">
              <Form.Group as={Row} className="m-2">
                <Form.Label column className="col-4">
                  Start ID
                </Form.Label>
                <Col className="col-8">
                  <Form.Control
                    type="number"
                    name={"start"}
                    min={minId}
                    max={maxId}
                    onChange={handleEditData}
                    defaultValue={factoryData.start}
                  />
                </Col>
              </Form.Group>
            </Form>

            <Form className="align-items-center">
              <Form.Group as={Row} className="m-2">
                <Form.Label column className="col-4">
                  Stop ID
                </Form.Label>
                <Col className="col-8">
                  <Form.Control
                    type="number"
                    name={"stop"}
                    min={factoryData.start + 1}
                    max={maxId}
                    onChange={handleEditData}
                    defaultValue={factoryData.stop}
                  />
                </Col>
              </Form.Group>
            </Form>

            <Form className="align-items-center">
              <Form.Group as={Row} className="m-2">
                <Form.Label column className="col-4">
                  ExportFolder
                </Form.Label>
                <Col className="col-8">
                  <InputGroup>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        getFolder("exportPath");
                      }}
                    >
                      フォルダを選択
                    </Button>
                    <Form.Control
                      type="string"
                      name={"exportPath"}
                      onChange={handleEditData}
                      value={factoryData.exportPath}
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Container className="d-flex justify-content-center">
              <Button onClick={startFactory}>画像合成をスタートする</Button>
            </Container>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>ID No.{runNumber}を合成中</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            {completedImage !== "" && (
              <Image
                src={"file:///" + completedImage}
                height={300}
                alt={"完成後のイメージ画像"}
              ></Image>
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </>
      )}
    </Modal>
  );
};
