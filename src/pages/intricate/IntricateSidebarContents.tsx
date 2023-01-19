import { CSSProperties, useState } from "react";
import { NavLink } from "react-router-dom";

import type { SidebarDataType } from "../../utils/intricateSidebarData";
import { GetSvg } from "../../components/GetSvg";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const activeStyle = (isActive: boolean): CSSProperties => {
  return {
    backgroundColor: isActive ? "#8bacd9" : "",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    textDecoration: "none",
  };
};

export const IntricateSidebarContents = ({
  menu,
}: {
  menu: SidebarDataType;
}) => {
  const [color, setColor] = useState("");

  return (
    <Row
      style={{
        height: "50px",
        backgroundColor: color,
      }}
      onMouseEnter={() => setColor("#8bacd9")}
      onMouseLeave={() => setColor("")}
    >
      <NavLink to={menu.link} style={({ isActive }) => activeStyle(isActive)}>
        <Col
          className="col-2"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <GetSvg name={menu.icon} />
        </Col>
        <Col style={{ flex: "1" }}>{menu.title}</Col>
      </NavLink>
    </Row>
  );
};
