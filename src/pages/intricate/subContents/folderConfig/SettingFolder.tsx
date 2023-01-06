import { useContext, useState } from "react";

import type { IntricateDataType } from "../../../../schema/intricate";
import { IntricateContext } from "../../IntricateContext";
import { useHandleForm } from "../../../../hooks/useHandleForm";
import { GlobalAlert } from "../../../../components/GlobalAlert";
import { IpcStatus } from "../../../../schema/ipc";
import { linkTo } from "../../../../hooks/linkTo";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

type Pairing = { [key: string]: IntricateDataType["pairing"] };

export const SettingFolder = () => {
  const { intricateDatas, saveData } = useContext(IntricateContext);

  const formItems: { id: IntricateDataType["pairing"]; label: string }[] = [
    { id: "main", label: "メイン" },
    { id: "option", label: "オプション" },
    { id: "bg", label: "背景" },
    { id: "delete", label: "不要" },
  ];

  //pairngの設定
  const initPairing: Pairing = {};
  intricateDatas.map((value) => {
    return (initPairing[value.folder] = value.pairing);
  });
  const [pairing, setPairing] = useState<Pairing>(initPairing);

  const { handleCheckRadio } = useHandleForm<Pairing>({
    updateDatas: pairing,
    setUpdateDatas: setPairing,
  });

  //アラート関係
  //TODO まとめる
  const alert = { text: "背景は、必ず一つ選択してください", variant: "danger" };
  const [ipcStatus, setIpcStatus] = useState<IpcStatus>("stop");

  //データを保存する
  const next = async () => {
    if (Object.values(pairing).filter((v) => v === "bg").length !== 1) {
      setIpcStatus("error");
    } else {
      intricateDatas.map((value) => {
        return (value.pairing = pairing[value.folder]);
      });

      intricateDatas.filter((value) => {
        return value.pairing === "bg";
      })[0].id = 0;

      intricateDatas
        .filter((value) => {
          return value.pairing !== "bg";
        })
        .map((value, index) => {
          return (value.id = index + 1);
        });

      intricateDatas.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });

      saveData();
      linkTo("/intricate/mainConfig");
    }
  };

  const TwoPages = ({
    value,
    index,
  }: {
    value: IntricateDataType;
    index: number;
  }) => {
    return (
      <Form.Group as={Row} className="mb-3" key={`folder-${index}`}>
        <Form.Label column>{value.folder}</Form.Label>
        <Col className="col-8 d-flex align-items-center p-0 m-0">
          {formItems.map((item, key) => (
            <Form.Check
              inline
              id={item.id}
              checked={pairing[value.folder] === item.id}
              label={item.label}
              name={value.folder}
              type="radio"
              onChange={handleCheckRadio}
              key={`radio-${key}`}
            />
          ))}
        </Col>
      </Form.Group>
    );
  };

  //TODO 1250pxまでは左右見開きにする
  return (
    <>
      <Container fluid className="py-3">
        <Row>
          <Col>
            <Form>
              {intricateDatas.map((value, index) => {
                return (
                  index % 2 === 0 && (
                    <TwoPages value={value} index={index} key={index} />
                  )
                );
              })}
            </Form>
          </Col>
          <Col>
            <Form>
              {intricateDatas.map((value, index) => {
                return (
                  index % 2 === 1 && (
                    <TwoPages value={value} index={index} key={index} />
                  )
                );
              })}
            </Form>
          </Col>
        </Row>
        <Button onClick={next}>データを保存して次に進む</Button>
      </Container>
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
