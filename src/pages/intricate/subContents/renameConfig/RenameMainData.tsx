import { useContext } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { IntricateDataType } from "../../../../schema/intricate";
import { IntricateContext } from "../../IntricateContext";

type Props = {
  data: IntricateDataType;
};

export const RenameMainData: React.FC<Props> = ({ data }) => {
  const { intricateDatas, setIntricateDatas } = useContext(IntricateContext);

  const renameFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.rename = e.target.value;
    setIntricateDatas(intricateDatas);
  };
  const removeFunc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "false") {
      data.notRemove = false;
    } else {
      data.notRemove = true;
    }
    setIntricateDatas(intricateDatas);
  };

  return (
    <>
      <Col className="col-2">
        <Form.Control
          name={"rename"}
          onChange={renameFunc}
          defaultValue={data.rename === undefined ? "" : data.rename}
        />
      </Col>

      <Col className="col-1">
        <Form.Select
          onChange={removeFunc}
          defaultValue={
            data.notRemove === undefined ? "true" : String(data.notRemove)
          }
        >
          <option value={"true"}>必要</option>
          <option value={"false"}>不要</option>
        </Form.Select>
      </Col>
    </>
  );
};
