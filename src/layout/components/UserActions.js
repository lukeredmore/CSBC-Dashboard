import React, { useState } from "react";
import { connect } from "react-redux";

import { signInStart, signOutStart } from "../../redux/user/user.actions";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

import "./UserActions.scss";

const UserActions = ({ currentUser, history, signInStart, signOutStart }) => {
  const [visible, setVisible] = useState(false);

  if (currentUser) {
    const { displayName, photoURL } = currentUser;
    return (
      <div className="user-actions" onClick={() => setVisible(!visible)}>
        <div className="user-dropdown-toggle">
          <img
            className="user-avatar rounded-circle mr-2 user-dropdown-image"
            src={photoURL}
            alt="User Avatar"
          />
          <span className="display-name">{displayName}</span>
          <i className="material-icons">keyboard_arrow_down</i>
        </div>
        <div className={`dropdown-option-shadow ${visible ? "" : "hidden"}`} />
        <SlideDown className="my-dropdown-slidedown">
          {visible ? (
              <div className="dropdown-option-container">
                <div
                  className="dropdown-option"
                  onClick={() => history.push("/profile")}
                >
                  <i className="material-icons">person</i> Profile
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => history.push("/settings")}
                >
                  <i className="material-icons">settings</i> Settings
                </div>
                <div
                  className="dropdown-option border-top"
                  onClick={signOutStart}
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
    return (
      <span className="user-actions-no-user" onClick={signInStart}>
        Sign In
      </span>
    );
  }
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});
const mapDispatchToProps = dispatch => ({
  signInStart: () => dispatch(signInStart()),
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
