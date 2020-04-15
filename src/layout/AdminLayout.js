import React from "react";
import "./AdminLayout.scss";

import UserActions from "./components/UserActions";
import MainFooter from './components/MainFooter'
import Logo from "../assets/lettermark.png"

import items from "./sidebar-nav-items.json";

class AdminLayout extends React.Component {
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
      <div className="admin-layout">
        <div className="user-container border-bottom">
          <i className="fa fa-bars show-menu" onClick={this.toggleShown} />
          <img className="header-lettermark" src={Logo} alt="CSBC Dashboard" />
          <div className="user-actions-container">
            <UserActions history={this.props.history} />
          </div>
        </div>
        <div
          className={
            "new-sidebar" +
            (this.state.sidebarHiddenOnNarrowView ? " hidden" : "")
          }
        >
          <div className="items-container">
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => this.props.history.push(`/admin${item.to}`)}
                className={
                  "new-nav-item" +
                  (this.props.match.path.includes(item.to) ? " selected" : "")
                }
              >
                <i className="material-icons">{item.icon}</i>
                {item.title}
              </div>
            ))}
          </div>
          <div className="border-top logo-container">
            <img
              className="d-inline-block align-top mr-1"
              style={{ maxWidth: "35px" }}
              src={Logo}
              alt="CSBC Dashboard"
            />
            <span className="wordmark">CSBC Dashboard</span>
          </div>
        </div>
        <div className="shadow-overlay" />
        <div
          className={
            "component-footer-holder" +
            (this.state.contentCoveredOnNarrowView ? " covered" : "")
          }
        >
          <div className="component">{this.props.children}</div>
          <MainFooter />
        </div>
      </div>
    );
  }
}

export default AdminLayout;
