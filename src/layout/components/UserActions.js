import React from "react";
import { connect } from "react-redux";

import { signInStart, signOutStart } from "../../redux/user/user.actions";
import { SlideDown} from 'react-slidedown'
import "react-slidedown/lib/slidedown.css";

import "./UserActions.scss";

class UserActions extends React.Component {
  state = {
    visible: false
  };

  toggle = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    if (this.props.currentUser) {
      const { displayName, photoURL } = this.props.currentUser;
      return (
        <div className="user-actions" onClick={this.toggle}>
          <div className="user-dropdown-toggle">
            <img
              className="user-avatar rounded-circle mr-2 user-dropdown-image"
              src={photoURL}
              alt="User Avatar"
            />
            <span className="display-name">{displayName}</span>
            <i className="material-icons">keyboard_arrow_down</i>
          </div>
          <div
            className={`dropdown-option-shadow ${
              this.state.visible ? "" : "hidden"
            }`}
          />
          <SlideDown className={"my-dropdown-slidedown"}>
            {this.state.visible ? (
              <div className="dropdown-option-container">
                <div
                  className="dropdown-option"
                  onClick={() => this.props.history.push("/profile")}
                >
                  <i className="material-icons">person</i> Profile
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => this.props.history.push("/settings")}
                >
                  <i className="material-icons">settings</i> Settings
                </div>
                <div
                  className="dropdown-option border-top"
                  onClick={this.props.signOutStart}
                >
                  <i className="material-icons text-danger">exit_to_app</i>{" "}
                  Logout
                </div>
              </div>
            ) : null}
          </SlideDown>
        </div>
      );
    } else {
      return <span className="user-actions-no-user" onClick={this.props.signInStart}>Sign In</span>
    }
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});
const mapDispatchToProps = dispatch => ({
  signInStart: () => dispatch(signInStart()),
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
