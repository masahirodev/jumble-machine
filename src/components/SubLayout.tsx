import { useContext } from "react";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";
import { IntricateContext } from "../pages/intricate/IntricateContext";
import { Sidebar } from "../pages/intricate/Sidebar";

export const SubLayout = () => {
  const { intricateDatas } = useContext(IntricateContext);

  return (
    <>
      {intricateDatas !== undefined && (
        <>
          <Col
            className="col-2"
            style={{
              background: "#b2cbe4",
              overflowY: "auto",
              maxHeight: `calc(100vh - 48px - 15vh)`,
            }}
          >
            <Sidebar />
          </Col>
          <Col
            style={{
              background: "#E6F7FF",
              flex: "1",
              overflowY: "auto",
              maxHeight: `calc(100vh - 48px - 15vh)`,
            }}
          >
            <Outlet />
          </Col>
        </>
      )}
    </>
  );
};
