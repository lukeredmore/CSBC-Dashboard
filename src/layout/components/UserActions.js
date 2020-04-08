import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavLink
} from "shards-react";
import { connect } from "react-redux";

import "./UserActions.scss";
import SignOutButton from "./SignOutButton";
import { signInStart } from "../../redux/user/user.actions"

class UserActions extends React.Component {
  state = {
    visible: false
  };

  toggleDropdown = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    if (this.props.currentUser) {
      const { displayName, photoURL } = this.props.currentUser;
      return (
        <div className="user-actions" onClick={this.toggleDropdown}>
          <DropdownToggle tag={NavLink} className="user-dropdown-toggle">
            <img
              className="user-avatar rounded-circle mr-2 user-dropdown-image"
              src={photoURL}
              alt="User Avatar"
            />
            <span className="display-name">{displayName}</span>
            <i className="material-icons">keyboard_arrow_down</i>
          </DropdownToggle>
          <Collapse tag={DropdownMenu} right small open={this.state.visible}>
            <DropdownItem tag={Link} to="user-profile">
              <i className="material-icons">person</i> Profile
            </DropdownItem>
            <DropdownItem tag={Link} to="settings">
              <i className="material-icons">settings</i> Settings
            </DropdownItem>
            <DropdownItem divider />
            <SignOutButton />
          </Collapse>
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
  signInStart: () => dispatch(signInStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
