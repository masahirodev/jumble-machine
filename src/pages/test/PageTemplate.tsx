//TODO テンプレート化
import { SpeechBalloons } from "../../components/SpeechBalloons";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type Props = {
  button: JSX.Element;
  contents: JSX.Element;
  comment: string | string[];
};

export const PageTemplate: React.FC<Props> = ({
  button,
  contents,
  comment,
}) => {
  return (
    <>
      <Container fluid className="px-5">
        <Row>
          <Col>
            <SpeechBalloons comment={comment} />
          </Col>
          <Col className="col-4 d-flex align-items-center justify-content-end">
            {button}
          </Col>
        </Row>
      </Container>
      {contents}
    </>
  );
};
