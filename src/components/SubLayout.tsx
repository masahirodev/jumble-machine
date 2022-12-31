import Col from "react-bootstrap/esm/Col";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../pages/intricate/Sidebar";

export const SubLayout = () => {
  return (
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
  );
};
