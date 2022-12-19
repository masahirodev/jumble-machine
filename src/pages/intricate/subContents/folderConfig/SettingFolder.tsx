import { useContext, useState } from "react";

import type { IntricateDataType } from "../../../../schema/intricate";
import { IntricateContext } from "../../IntricateContext";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHandleForm } from "../../../../hooks/useHandleForm";

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

  //データを保存する
  const next = async () => {
    intricateDatas.map((value) => {
      return (value.pairing = pairing[value.folder]);
    });
    saveData();
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
      <Container fluid style={{ background: "white" }}>
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
    </>
  );
};
