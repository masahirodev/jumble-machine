import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Col, Container, Row } from "react-bootstrap";
import { CommentHeader } from "./CommentHeader";
import { ButtonHeader } from "./ButtonHeader";

//TODO GlobalLayoutContextで誤魔化している
export const GlobalLayout: React.FC = () => {
  return (
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        margin: "0",
        padding: "0",
      }}
    >
      <Header />
      <Row
        style={{
          height: "15vh",
          display: "flex",
          flexDirection: "row",
          margin: "0",
          padding: "0",
        }}
      >
        <Col style={{ alignItems: "center", flex: "1" }}>
          <CommentHeader />
        </Col>
        <Col
          className="col-4"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <ButtonHeader />
        </Col>
      </Row>
      <Row
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "row",
          margin: "0",
          padding: "0",
        }}
      >
        <Outlet />
      </Row>
    </Container>
  );
};
