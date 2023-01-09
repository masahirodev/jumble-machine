import { useContext, useState } from "react";

import { useComment } from "../../hooks/useComment";
import { useOperateIpc } from "../../hooks/useOperateIpc";
import { PrepContext } from "./PrepContext";
import { GlobalAlert } from "../../components/GlobalAlert";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AddOptionDescription } from "./AddOptionDescription";

export const AddOptionForm = () => {
  const { projectId, maxQuantity } = useContext(PrepContext);
  const [addQuantity, setAddQuantity] = useState<number>(0);

  const { selectSetComment } = useComment();
  const handleEditData = (e: any) => {
    setAddQuantity(e.target.value);
  };

  const { ipcStatus, setIpcStatus, alert, operateIpc, dispatch } =
    useOperateIpc();

  const saveData = async () => {
    await operateIpc({
      ipc: "store",
      method: "set",
      arg: {
        name: String(projectId),
        key: "add",
        value: { quantity: addQuantity },
      },
    });
  };

  const addOptionFunc = async () => {
    if (maxQuantity >= addQuantity) {
      await saveData();
      const fetch = await operateIpc({
        ipc: "operateFastApi",
        method: "addIntricateJumble",
        arg: {
          projectId: projectId,
        },
      });
      dispatch({
        type: "other",
        payload: {
          method: "other",
          status: "success",
          message: `Blueprintデータに${fetch.response}個のデータを追加することができたよ。上のタブ「Blueprint」から移動してね`,
        },
      });
      setIpcStatus("error");
    }
  };

  return (
    <>
      <Form onMouseEnter={() => selectSetComment("addOptionFunc")}>
        <Form.Group as={Row} className="m-2">
          <Form.Label column className="col-4">
            追加したいデータ数
          </Form.Label>
          <Col className="col-6">
            <Form.Control
              type={"number"}
              name={"value"}
              onChange={handleEditData}
              value={addQuantity}
              max={maxQuantity}
              min={0}
            />
          </Col>
          <Col>
            <Button onClick={addOptionFunc}>データを追加する</Button>
          </Col>
        </Form.Group>
      </Form>
      <AddOptionDescription />
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
