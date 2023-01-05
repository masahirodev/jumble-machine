import { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { IntricateDataType } from "../../../../schema/intricate";
import { IntricateContext } from "../../IntricateContext";

export const RenameFolder = ({ data }: { data: IntricateDataType }) => {
  const { intricateDatas, setIntricateDatas } = useContext(IntricateContext);

  const renameFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.combi = e.target.value;
    setIntricateDatas(intricateDatas);
  };

  const propertyFunc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //    if (e.target.value === "false") {
    //      data.property = false;
    //    } else {
    //      data.property = true;
    //    }
    //setIntricateDatas(intricateDatas);
  };
  return (
    <>
      <Col className="col-2">
        <Form.Control
          type={typeof data}
          name={"rename"}
          onChange={renameFunc}
          defaultValue={data === undefined ? "" : data.combi}
        />
      </Col>
      <Col className="col-1">
        <Form.Select
          onChange={propertyFunc}
          defaultValue={
            data.property === undefined ? "true" : String(data.property)
          }
        >
          <option value={"true"}>必要</option>
          <option value={"false"}>不要</option>
        </Form.Select>
      </Col>
    </>
  );
};
