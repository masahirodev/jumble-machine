import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

type Props = {
  label: string;
  image: string;
  onClick: () => void;
  disable?: boolean;
};

export const ConnectButton: React.FC<Props> = ({
  label,
  image,
  onClick,
  disable,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disable}
      variant={disable === true ? "secondary" : "primary"}
    >
      <Container>
        <Row>
          <Col className="p-0 pe-2">{label}</Col>
          <Col className="p-0">
            <img
              src={image}
              width={24}
              height={24}
              alt={label}
              className="d-flex align-self-center"
            />
          </Col>
        </Row>
      </Container>
    </Button>
  );
};
