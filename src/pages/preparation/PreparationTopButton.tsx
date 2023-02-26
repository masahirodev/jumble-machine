import { useContext, useState } from "react";
import { linkTo } from "../../router/linkTo";
import { GlobalAlert } from "../../components/GlobalAlert";
import { useOperateIpc } from "../../hooks/useOperateIpc";
import { checkConfirmation } from "../../hooks/checkConfirmation";
import { useComment } from "../../hooks/useComment";
import { PrepContext } from "./PrepContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const PreparationTopButton = () => {
  const { maxQuantity, prepData, projectId, hasIntricateDatas } =
    useContext(PrepContext);
  const { selectSetComment } = useComment();
  const { ipcStatus, setIpcStatus, alert, operateIpc, dispatch } =
    useOperateIpc();

  const [method, setMethod] = useState<boolean>(hasIntricateDatas);
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
  const next = async () => {
    checkConfirmation(projectId, "blueprint", () => jumbleFunc());
  };

  const jumbleFunc = async () => {
    if (maxQuantity >= Number(prepData.quantity)) {
      await saveData();
      const fetch = await operateIpc({
        ipc: "operateFastApi",
        method: method ? "intricateJumble" : "jumble",
        arg: {
          projectId: projectId,
        },
      });
      if (fetch.status) {
        linkTo("blueprint");
      }
    } else {
      prepData.quantity = maxQuantity;
      await saveData();
      dispatch({
        type: "other",
        payload: {
          method: "other",
          status: "error",
          message:
            "組み合わせ総数と作成したい画像の数がマッチしていません。組み合わせを見直してね",
        },
      });
      setIpcStatus("error");
    }
  };

  return (
    <>
      <div style={{ display: "inline-block", marginRight: "0.5rem" }}>
        Design
      </div>
      <Form.Check
        disabled={!hasIntricateDatas}
        type="switch"
        style={{ display: "inline-block", marginRight: "3rem" }}
        label="Intricate"
        defaultChecked={hasIntricateDatas}
        onChange={() => {
          setMethod(!method);
        }}
      />
      <Button
        variant="success"
        type="button"
        onClick={checkAndSave}
        className={"me-3"}
        onMouseEnter={() => selectSetComment("commonSaveButton")}
      >
        データを保存
      </Button>
      <Button
        onClick={() => next()}
        onMouseEnter={() => selectSetComment("prepNextButton")}
      >
        次へ
      </Button>
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
