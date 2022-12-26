import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import { CSSProperties, useState } from "react";

const activeStyle = (isActive: boolean): CSSProperties => {
  return {
    backgroundColor: isActive ? "#8bacd9" : "",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
};

const SidebarContents = ({ menu }: any) => {
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
      {/*        to={`contacts/${contact.id}`}*/}
      <NavLink to={menu.link} style={({ isActive }) => activeStyle(isActive)}>
        <Row
          className="p-0 m-0"
          style={{ justifyContent: "center", alignContent: "center" }}
        >
          <Col
            className="col-2"
            style={{
              display: "flex",
              justifyContent: "end",
              placeItems: "center",
            }}
          >
            {menu.icon}
          </Col>
          <Col style={{ flex: "1" }}>{menu.title}</Col>
        </Row>
      </NavLink>
    </Row>
  );
};

export const Sidebar = () => {
  return (
    <>
      {SidebarData.map((menu, index) => {
        return <SidebarContents menu={menu} key={index} />;
      })}
    </>
  );
};
