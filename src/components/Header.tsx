import { NavLink } from "react-router-dom";
import { internalLinkContents, internalLinks } from "../utils/internalLinks";
import NotFound from "../assets/icon.svg";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

const activeStyle = {
  color: "#f2f45b",
};

//TODO ヘッダーデザイン変えたい
export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <NavLink to="/" className="navbar-brand ms-3">
        <Image
          src={NotFound}
          alt="NotFound"
          height={"30px"}
          className="mx-2"
        ></Image>
        <span style={{ color: "#f2f45b" }}>J</span>umble
        <span style={{ color: "#35bacf" }}>M</span>achine
      </NavLink>
      <Nav className="navbar-nav mr-auto">
        {internalLinks.map((value) => {
          if (
            process.env.NODE_ENV !== "development" &&
            (value === "test" || value === "delete")
          ) {
            return null;
          } else {
            return (
              <li className="nav-item" key={value}>
                <NavLink
                  to={value}
                  className="nav-link"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  {internalLinkContents[value]["title"]}
                </NavLink>
              </li>
            );
          }
        })}
      </Nav>
    </Navbar>
  );
};
