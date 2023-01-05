import { useContext } from "react";
import { IntricateContext } from "../../IntricateContext";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { RenameFolder } from "./RenameFolder";

const CustomStyle = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
};

export const RenameConfig = () => {
  const { intricateDatas, saveData } = useContext(IntricateContext);
  const next = () => {
    saveData();
  };
  const renameFunc = () => {};

  return (
    <Container className="p-3">
      {intricateDatas.map((data, index) => {
        return (
          <Row
            style={{ ...CustomStyle, display: "flex", alignItems: "center" }}
          >
            <Col className="col-3">{data.folder}</Col>
            <RenameFolder data={data} />
            <Col className="col-6">
              {data.fileDatas.map((data, index) => {
                return (
                  <Row key={index}>
                    <Col>{data.name}</Col>
                    <Col>
                      <Form.Control
                        name={"rename"}
                        onChange={renameFunc}
                        defaultValue={"qaa"}
                      />
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        );
      })}
      <Button onClick={next}>データを保存して次に進む</Button>
    </Container>
  );
};
