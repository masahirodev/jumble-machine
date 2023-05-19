import { useContext, useState } from "react";
import { TfiReload } from "react-icons/tfi";

import { BlueprintContext } from "./BlueprintContext";
import { FactoryModal } from "./FactoryModal";
import { linkTo } from "../../router/linkTo";
import { useComment } from "../../hooks/useComment";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useReload } from "../../hooks/useReload";

type Props = {};

export const BlueprintTopButton: React.FC<Props> = () => {
  const {
    blueprintDatas,
    setBlueprintDatas,
    saveData,
    switchingDisplay,
    setSwitchingDisplay,
  } = useContext(BlueprintContext);

  const { selectSetComment } = useComment();

  //次へ
  const next = async (e: React.MouseEvent<HTMLButtonElement>) => {
    saveData();
    linkTo("export");
  };

  //画像合成画面の呼出し
  const [modalShow, setModalShow] = useState<boolean>(false);

  const makeImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setBlueprintDatas(blueprintDatas);
    setModalShow(true);
  };

  const refreshPage = useReload();
  return (
    <>
      <Form.Check
        type="checkbox"
        label={"詳細表示"}
        className={"me-3"}
        onChange={(e) => setSwitchingDisplay(e.target.checked)}
        checked={switchingDisplay}
        style={{ display: "inline-block" }}
      />
      <Button
        variant="success"
        type="button"
        onClick={refreshPage}
        className={"me-3"}
        onMouseEnter={() => selectSetComment("blueprintReload")}
      >
        <TfiReload />
      </Button>
      <Button
        variant="success"
        type="button"
        onClick={makeImage}
        className={"me-3"}
        onMouseEnter={() => selectSetComment("commonSaveButton")}
      >
        画像を合成
      </Button>
      <Button
        variant="success"
        type="button"
        onClick={saveData}
        className={"me-3"}
        onMouseEnter={() => selectSetComment("commonSaveButton")}
      >
        データを保存
      </Button>
      <Button onClick={next}>次へ</Button>
      <FactoryModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};
