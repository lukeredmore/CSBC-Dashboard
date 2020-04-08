import React from "react";
import "./BasicLayout.scss";

import UserActions from "./components/UserActions";
import MainFooter from './components/MainFooter'

import items from "./sidebar-nav-items.json";

class BasicLayout extends React.Component {
  state = {
    sidebarHiddenOnNarrowView: true,
    contentCoveredOnNarrowView: false
  };

  //These values should be inverses of each other, but there's a delay for style purposes
  toggleShown = () => {
    const willHideSidebar = this.state.sidebarHiddenOnNarrowView;
    if (willHideSidebar) {
      this.setState({ sidebarHiddenOnNarrowView: false }, () => {
        window.setTimeout(
          () =>
            this.setState({
              contentCoveredOnNarrowView: true
            }),
          300
        );
      });
    } else {
      this.setState({
        sidebarHiddenOnNarrowView: true,
        contentCoveredOnNarrowView: false
      });
    }
  };

  render() {
    return (
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
          <UserActions />
        </div>
        <div className="component">{this.props.children}</div>
        <MainFooter />
      </div>
    );
  }
}

export default BasicLayout;
