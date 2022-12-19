import { useState } from "react";
import { OptionPart } from "../../../../schema/intricate";

import { HiPlusCircle } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

type Props = {
  optionParts: OptionPart[];
  isUpdate: boolean;
  funcOptionParts: (updateOptionPart: OptionPart) => void;
};

export const OptionPartsLayout: React.FC<Props> = ({
  optionParts,
  isUpdate,
  funcOptionParts,
}) => {
  const OptionPartLayout = ({ optionPart }: { optionPart: OptionPart }) => {
    const [updateOptionPart, setUpdateOptionPart] =
      useState<OptionPart>(optionPart);

    const [unit, setUnit] = useState<string>(
      optionPart.property === "random" ? "%" : "個"
    );

    //排出設定
    const propertyFunc = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setUpdateOptionPart({
        ...updateOptionPart,
        property: e.target.value as OptionPart["property"],
      });
      setUnit(e.target.value === "random" ? "%" : "個");
    };

    //Option設定
    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUpdateOptionPart({
        ...updateOptionPart,
        option: Number(e.target.value),
      });
    };
    return (
      <Row>
        <Col className="col-11">
          <InputGroup>
            <InputGroup.Text className="col-6">
              {optionPart.name}
            </InputGroup.Text>
            <Form.Select
              onChange={propertyFunc}
              className="col-2"
              defaultValue={optionPart.property}
            >
              <option value={"random"}>ランダム</option>
              <option value={"fixed"}>個数</option>
            </Form.Select>
            <Form.Control
              className="col-2"
              onChange={changeOption}
              defaultValue={optionPart.option}
              type="number"
            />
            <InputGroup.Text className="col-1">{unit}</InputGroup.Text>
          </InputGroup>
        </Col>
        <Col
          className="col-1"
          style={{
            display: "grid",
            justifyContent: "center",
            placeItems: "center",
          }}
        >
          {isUpdate ? (
            <HiPlusCircle
              size={30}
              color={"#198754"}
              onClick={() => funcOptionParts(updateOptionPart)}
            />
          ) : (
            <TiDelete
              size={36}
              color={"#dc3545"}
              onClick={() => funcOptionParts(updateOptionPart)}
            />
          )}
        </Col>
      </Row>
    );
  };

  return (
    <>
      {optionParts.map((optionPart, index) => {
        return <OptionPartLayout optionPart={optionPart} key={index} />;
      })}
    </>
  );
};
