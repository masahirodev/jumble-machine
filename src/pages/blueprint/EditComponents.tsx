import { useContext, useState } from "react";
import { BlueprintContext } from "./BlueprintContext";

import { TiDelete } from "react-icons/ti";
import { HiPlusCircle } from "react-icons/hi";

import { SubData } from "../../schema/blueprintData";
import { ImageDialog } from "../../components/ImageDialog";
import { tableHeader } from "../../schema/tableHeader";
import { useOperateIpc } from "../../hooks/useOperateIpc";
import { GlobalAlert } from "../../components/GlobalAlert";
import { IpcStatus } from "../../schema/ipc";
import NotFound from "../../assets/notFound.svg";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";

type Props = {
  onHide: () => void;
};

export const EditComponents: React.FC<Props> = ({ onHide }) => {
  const {
    blueprintDatas,
    setBlueprintDatas,
    editData,
    setEditData,
    deleteData,
    addData,
    moveData,
    exData,
    setExData,
  } = useContext(BlueprintContext);

  //アラート関係
  //TODO まとめる
  const initAlert = {
    text: "",
    variant: "",
  };
  const [alert, setAlert] = useState<{ text: string; variant: string }>(
    initAlert
  );
  const [ipcStatus, setIpcStatus] = useState<IpcStatus>("stop");

  //フォーム
  const handleEditData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (typeof editData[name] === "number") {
      setEditData({ ...editData, [name]: Number(value) });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleEditSubData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const subDatas = editData["subDatas"];
    const editSubData: SubData[] = [{ attribute: name, value: value }];

    if (editData["subDatas"] === undefined) {
    } else {
      const result = editData["subDatas"].findIndex(
        (subData) => subData.attribute === name
      );
      if (result !== -1) {
        subDatas.splice(result, 1);
      }
      setEditData({ ...editData, subDatas: editSubData.concat(subDatas) });
    }
  };

  //削除ボタン
  const delButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteData(editData.id);
    moveData(editData.id, 1);
  };

  //追加ボタン
  const addButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextId = addData(editData);
    setAlert({ text: `ID No.${nextId}を追加しました。`, variant: "success" });
    setIpcStatus("success");
    //onHide();
  };

  //editdataの保存
  const saveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filterData = blueprintDatas.filter(
      (blueprintData) => blueprintData.id !== editData.id
    );
    const updatedData = [...filterData, { ...editData }].sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
    setBlueprintDatas(updatedData);
    setCanselAttribute([]);
  };

  //キャンセルボタン
  const cancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const update = exData.filter((value) => {
      return canselAttribute.indexOf(value) === -1;
    });
    setExData(update);
    onHide();
  };

  const { operateIpc } = useOperateIpc();

  //Imageファイルの挿入
  const setImage = async () => {
    const fetch = await operateIpc({
      ipc: "operateShowOpen",
      method: "getFile",
      arg: {
        fileName: "画像ファイル",
        extension: ["jpg", "png", "svg"],
      },
    });
    if (fetch.status) {
      setEditData({
        ...editData,
        imagePath: fetch.response as string,
      });
    }
  };

  //attribute削除
  const deleteExData = (value: string) => {
    const update = editData["subDatas"].filter((subData) => {
      return !(value === subData.attribute);
    });
    setEditData({
      ...editData,
      subDatas: update,
    });
  };

  const initNewSubData: SubData = {
    attribute: "",
    value: "",
  };
  const [newSubData, setNewSubData] = useState(initNewSubData);
  const [canselAttribute, setCanselAttribute] = useState<string[]>([]);

  //attribute追加
  const addExData = () => {
    if (
      exData.filter((value) => {
        return value === newSubData.attribute;
      }).length === 0
    ) {
      exData.push(newSubData.attribute);
      canselAttribute.push(newSubData.attribute);
      setCanselAttribute(canselAttribute);
      setEditData({
        ...editData,
        subDatas: editData["subDatas"].concat(newSubData),
      });
      setNewSubData(initNewSubData);
    } else {
      setAlert({ text: "重複する為、追加できません", variant: "danger" });
      setIpcStatus("error");
    }
  };

  //新規attributeの入力フォーム用
  const handleEditNewSubData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSubData({ ...newSubData, [name]: value });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Row className="mb-3">
              {editData["imagePath"] === "" ||
              editData["imagePath"] === undefined ? (
                <>
                  <Image src={NotFound} alt="NotFound" height={"300px"}></Image>
                </>
              ) : (
                <Col className="d-flex justify-content-center">
                  <ImageDialog src={editData["imagePath"]}></ImageDialog>
                </Col>
              )}
            </Row>
            <Row>
              {tableHeader.map((value) => {
                switch (value) {
                  case "id":
                    return null;
                  case "subDatas":
                    return null;
                  case "imagePath":
                    return (
                      <Form key={value}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm="4">
                            {value}
                          </Form.Label>
                          <Col sm="8">
                            <InputGroup>
                              <Button
                                variant="outline-secondary"
                                onClick={setImage}
                              >
                                ファイルを選択
                              </Button>
                              <Form.Control
                                type={typeof editData[value]}
                                name={value}
                                onChange={handleEditData}
                                defaultValue={
                                  editData[value] === undefined
                                    ? ""
                                    : editData[value]
                                }
                              />
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </Form>
                    );
                  default:
                    return (
                      <Form key={value}>
                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm="4">
                            {value}
                          </Form.Label>
                          <Col sm="8">
                            {value === "text" ? (
                              <Form.Control
                                as="textarea"
                                rows={3}
                                name={value}
                                onChange={handleEditData}
                                value={editData[value]}
                              />
                            ) : (
                              <Form.Control
                                type={typeof editData[value]}
                                name={value}
                                onChange={handleEditData}
                                value={editData[value]}
                              />
                            )}
                          </Col>
                        </Form.Group>
                      </Form>
                    );
                }
              })}
            </Row>
          </Col>
          <Col>
            {exData.map((value) => {
              return (
                <Form key={value}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column className="col-4">
                      {value}
                    </Form.Label>
                    <Col className="col-7">
                      <Form.Control
                        type={"string"}
                        name={value}
                        onChange={handleEditSubData}
                        value={
                          editData.subDatas.some(
                            (subData) => subData["attribute"] === value
                          )
                            ? editData.subDatas.find(
                                (subData) => subData["attribute"] === value
                              )?.value
                            : ""
                        }
                      />
                    </Col>
                    <Col className="col-1 p-0 d-flex justify-content-center align-items-center">
                      <TiDelete
                        size={36}
                        color={"#dc3545"}
                        onClick={() => deleteExData(value)}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              );
            })}
            <Row>
              <Col className="col-4">
                <Form.Control
                  type={"string"}
                  name={"attribute"}
                  onChange={handleEditNewSubData}
                  value={newSubData.attribute}
                />
              </Col>
              <Col className="col-7">
                <Form.Control
                  type={"string"}
                  name={"value"}
                  onChange={handleEditNewSubData}
                  value={newSubData.value}
                />
              </Col>
              <Col className="col-1 p-0 d-flex justify-content-center align-items-center">
                <HiPlusCircle size={30} color={"#198754"} onClick={addExData} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="d-flex justify-content-center">
        <Button
          style={buttonStyle}
          variant="warning"
          type="button"
          onClick={(e) => {
            saveButton(e);
            moveData(editData.id, -1);
          }}
        >
          Back
        </Button>
        <Button
          style={buttonStyle}
          variant="success"
          type="submit"
          onClick={(e) => {
            saveButton(e);
            onHide();
          }}
        >
          Save
        </Button>
        <Button
          style={buttonStyle}
          variant="primary"
          type="button"
          onClick={addButton}
        >
          New
        </Button>
        <Button
          style={buttonStyle}
          variant="secondary"
          type="button"
          onClick={cancelButton}
        >
          Cancel
        </Button>
        <Button
          style={buttonStyle}
          variant="danger"
          type="button"
          onClick={delButton}
        >
          Del
        </Button>
        <Button
          style={buttonStyle}
          variant="warning"
          type="button"
          onClick={(e) => {
            saveButton(e);
            moveData(editData.id, 1);
          }}
        >
          Next
        </Button>
      </Container>
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};

const buttonStyle = {
  marginTop: 20,
  marginLeft: 20,
  width: 100,
};
