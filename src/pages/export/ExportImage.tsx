import { ExportData } from "../../schema/exportData";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type Props = {
  handleEditData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  exportData: ExportData;
  adjustImage: () => Promise<void>;
};

export const ExportImage: React.FC<Props> = ({
  handleEditData,
  exportData,
  adjustImage,
}) => {
  return (
    <>
      <Form className="align-items-center">
        <Form.Group as={Row} className="m-2">
          <Form.Label column className="col-2">
            画像データの名前を入力
          </Form.Label>
          <Col className="col-3">
            <Form.Control
              type={"string"}
              name={"name"}
              onChange={handleEditData}
              defaultValue={exportData.name}
            />
          </Col>
          <Form.Label column className="col-3">
            何番から連番スタートにする？
          </Form.Label>
          <Col className="col-1">
            <Form.Control
              type={"number"}
              min={0}
              name={"startTokenId"}
              onChange={handleEditData}
              defaultValue={exportData.startTokenId}
            />
          </Col>
          <Form.Label column className="col-2">
            {"⇒ "}
            {exportData.name}
            {exportData.startTokenId}.png
          </Form.Label>
          <Col>
            <Button onClick={adjustImage}>実行</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
