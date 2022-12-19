import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SidebarData } from "./SidebarData";
import Nav from "react-bootstrap/esm/Nav";
import { NavLink } from "react-router-dom";

const activeStyle = {
  backgroundColor: "#f2f45b",
};

//TODO 色設定、レイアウト
export const Sidebar = () => {
  return (
    <Col
      className="col-2"
      style={{
        height: "100%",
        backgroundColor: "aqua",
      }}
    >
      <Nav className="navbar-nav mr-auto">
        {SidebarData.map((value, index) => {
          return (
            <li className="nav-item" key={index}>
              <NavLink
                to={value.link}
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <Row
                  className="p-0 m-0"
                  style={{ justifyContent: "center", alignContent: "center" }}
                >
                  <Col
                    className="col-3"
                    style={{
                      display: "grid",
                      justifyContent: "end",
                      placeItems: "center",
                    }}
                  >
                    {value.icon}
                  </Col>
                  <Col className="col-9">{value.title}</Col>
                </Row>
              </NavLink>
            </li>
          );
        })}
      </Nav>
    </Col>
  );
};
