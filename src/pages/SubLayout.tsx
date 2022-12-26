import Col from "react-bootstrap/esm/Col";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./intricate/Sidebar";

export const SubLayout = () => {
  return (
    <>
      <Col className="col-2" style={{ background: "#b2cbe4" }}>
        <Sidebar />
      </Col>
      <Col style={{ background: "#E6F7FF", flex: "1" }}>
        <Outlet />
      </Col>
    </>
  );
};
