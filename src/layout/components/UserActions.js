import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavLink
} from "shards-react";
import { auth } from '../../firebase'
import { connect } from 'react-redux'

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
    const { displayName, photoURL } = this.props.currentUser;
    return (
      <div
        onClick={this.toggleDropdown}
        style={{ display: "inline-block", position: "relative"}}
      >
        <DropdownToggle tag={NavLink} style={{ cursor: "pointer" }}>
          <img
            className="user-avatar rounded-circle mr-2"
            src={photoURL}
            alt="User Avatar"
            style={{ height: "45px" }}
          />{" "}
          <span>{displayName}</span>
          <i className='material-icons'>keyboard_arrow_down</i>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">person</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="settings">
            <i className="material-icons">settings</i> Settings
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            tag={Link}
            to="/"
            onClick={() => auth.signOut()}
            className="text-danger"
          >
            <i className="material-icons text-danger">exit_to_app</i> Logout
          </DropdownItem>
        </Collapse>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(UserActions)
