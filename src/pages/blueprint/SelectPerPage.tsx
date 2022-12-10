import { useContext } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { BlueprintContext } from "./BlueprintContext";

export const SelectPerPage = () => {
  const { NumberDataPerPage, setNumberDataPerPage, setPage } =
    useContext(BlueprintContext);

  const propertyFunc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setNumberDataPerPage(Number(e.target.value));
  };
  return (
    <>
      <Row className="align-items-center" style={{ color: "#0d6efd" }}>
        <Col style={{ textAlign: "end" }}>Item per page:</Col>
        <Col className={"p-0"}>
          <Form.Select
            onChange={propertyFunc}
            defaultValue={NumberDataPerPage}
            style={{ color: "#0d6efd" }}
          >
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={300}>300</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </Form.Select>
        </Col>
      </Row>
    </>
  );
};
