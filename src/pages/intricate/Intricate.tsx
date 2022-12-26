import { Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar";
import { PageTemplate } from "../test/PageTemplate";

import Container from "react-bootstrap/Container";
import { IntricateContext } from "./IntricateContext";
import { useContext } from "react";
import { IntricateTopButton } from "./IntricateTopButton";
import Col from "react-bootstrap/Col";

export const Intricate: React.FC = () => {
  const { intricateDatas, comment } = useContext(IntricateContext);

  return (
    <PageTemplate
      button={<IntricateTopButton />}
      contents={
        <>
          {intricateDatas !== undefined && (
            <Container
              fluid
              className="p-0 d-flex"
              style={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                overflowY: "auto",
                maxHeight: `calc(100vh - 48px - 15vh)`,
              }}
            >
              <Col className="col-2">
                <Sidebar />
              </Col>
              <Col
                style={{
                  background: "#dfebf7",
                  flex: "1",
                }}
              >
                <Outlet />
              </Col>
            </Container>
          )}
        </>
      }
      comment={comment}
    />
  );
};
