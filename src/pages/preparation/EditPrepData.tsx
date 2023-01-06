import { initPrepData, PrepData } from "../../schema/prepData";
import { useHandleForm } from "../../hooks/useHandleForm";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useComment } from "../../hooks/useComment";
import { useContext } from "react";
import { PrepContext } from "./PrepContext";

export const EditPrepData: React.FC = () => {
  const { prepData, setPrepData, maxQuantity } = useContext(PrepContext);

  //フォーム
  const { handleEditData } = useHandleForm<PrepData>({
    updateDatas: prepData,
    setUpdateDatas: setPrepData,
  });

  const { selectSetComment } = useComment();

  return (
    <>
      <Container className="px-5">
        <Container>
          {Object.keys(initPrepData).map((value) => {
            return (
              <Form
                key={value}
                className="align-items-center"
                onMouseEnter={() => selectSetComment(value)}
              >
                <Form.Group as={Row} className="m-2">
                  <Form.Label column className="col-4">
                    {value}
                  </Form.Label>
                  <Col className="col-8">
                    {value === "quantity" ? (
                      <Form.Control
                        type={"number"}
                        name={value}
                        onChange={handleEditData}
                        value={prepData[value]}
                        max={maxQuantity}
                        min={1}
                      />
                    ) : value === "description" ? (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name={value}
                        onChange={handleEditData}
                        value={prepData[value]}
                      />
                    ) : (
                      <Form.Control
                        type={"string"}
                        name={value}
                        onChange={handleEditData}
                        value={prepData[value]}
                      />
                    )}
                  </Col>
                </Form.Group>
              </Form>
            );
          })}
        </Container>
      </Container>
    </>
  );
};
