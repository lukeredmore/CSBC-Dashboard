import React from "react";
import "./BasicLayout.scss";

import UserActions from "./components/UserActions";
import MainFooter from "./components/MainFooter";

const BasicLayout = ({ children }) => (
  <div className="basic-layout">
    <div className="user-container border-bottom">
      <div className="logo-container">
        <img
          className="d-inline-block align-top mr-1"
          style={{ maxWidth: "35px" }}
          src={require("../assets/lettermark.png")}
          alt="CSBC Dashboard"
        />
        <span className="wordmark">CSBC Dashboard</span>
      </div>
      <img
        className="header-lettermark"
        src={require("../assets/lettermark.png")}
        alt="CSBC Dashboard"
      />
      <div className="user-actions-container">
        <UserActions />
      </div>
    </div>
    <div className="component">{children}</div>
    <MainFooter />
  </div>
);

export default BasicLayout;
