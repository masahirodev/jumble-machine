import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type Props = {
  adjustImage: () => Promise<void>;
};

export const ExportXRPLImage: React.FC<Props> = ({ adjustImage }) => {
  return (
    <>
      <Form className="align-items-center">
        <Form.Group as={Row} className="m-2">
          <Form.Label column className="col-3">
            画像データの番号を振り直す
          </Form.Label>
          <Col>
            <Button onClick={adjustImage}>実行</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
