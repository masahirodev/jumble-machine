import { useContext, useState } from "react";

import { BlueprintTable } from "./BlueprintTable";
import { linkTo } from "../../hooks/linkTo";
import { SpeechBalloons } from "../../components/SpeechBalloons";
import { PaginationComponents } from "./PaginationComponents";
import { BlueprintContext } from "./BlueprintContext";
import { FactoryModal } from "./FactoryModal";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TfiReload } from "react-icons/tfi";

type Props = {};

export const Blueprint: React.FC<Props> = () => {
  const { blueprintDatas, setBlueprintDatas, saveData, reloadData } =
    useContext(BlueprintContext);

  //TODO コメント
  const initComment: string =
    blueprintDatas[0].id !== -1 ? "・・・" : "まだジェネラティブが出来てないよ";

  const [comment, setComment] = useState<string | string[]>(initComment);

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

  //画面切替
  const [switchingDisplay, setSwitchingDisplay] = useState<boolean>(false);

  return (
    <>
      <Container fluid className="px-5">
        <Row>
          <Col>
            <SpeechBalloons comment={comment} />
          </Col>
          <Col className="col-4 d-flex align-items-center justify-content-end">
            <Form.Check
              type="checkbox"
              label={"詳細表示"}
              className={"me-3"}
              onChange={(e) => setSwitchingDisplay(e.target.checked)}
              checked={switchingDisplay}
            />

            <Button
              variant="success"
              type="button"
              onClick={reloadData}
              className={"me-3"}
              onMouseEnter={() => setComment(["データをリロードするよ。"])}
            >
              <TfiReload />
            </Button>

            <Button
              variant="success"
              type="button"
              onClick={makeImage}
              className={"me-3"}
              onMouseEnter={() =>
                setComment([
                  "編集が終わったら、必ず保存ボタンを押してね。",
                  "今は、あえて、自動保存には対応してないんだ。",
                ])
              }
            >
              画像を合成
            </Button>

            <Button
              variant="success"
              type="button"
              onClick={saveData}
              className={"me-3"}
              onMouseEnter={() =>
                setComment([
                  "編集が終わったら、必ず保存ボタンを押してね。",
                  "今は、あえて、自動保存には対応してないんだ。",
                ])
              }
            >
              データを保存
            </Button>
            <Button onClick={next}>次へ</Button>
          </Col>
        </Row>
      </Container>
      {blueprintDatas[0].id !== -1 && (
        <>
          <BlueprintTable switchingDisplay={switchingDisplay} />
          <PaginationComponents />
        </>
      )}
      <FactoryModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};
