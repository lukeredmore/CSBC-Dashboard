import React from "react";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";

const getCopyright = () => {
  const year = new Date().getFullYear()
  return "Copyright © " + year + " Catholic Schools of Broome County"
}
const menuItems = [
  {
    title: "Toggle Home",
    to: "/"
  },
  {
    title: "Dashboard Home",
    to: "/admin"
  },
  {
    title: "About",
    to: "/about"
  },
  {
    title: "Help",
    to: "/help"
  },
  {
    title: "Terms",
    to: "/terms"
  }
];

const MainFooter = () => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container style={{maxWidth: "100%", userSelect: 'none'}} fluid={false}>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <NavLink tag={Link} to={item.to}>
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">{getCopyright()}</span>
      </Row>
    </Container>
  </footer>
);
  

export default MainFooter;
