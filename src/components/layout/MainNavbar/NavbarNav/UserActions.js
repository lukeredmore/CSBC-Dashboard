import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { auth } from '../../../../firebase'
import { connect } from 'react-redux'

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const { displayName, photoURL } = this.props.currentUser
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3" style={{cursor: "pointer"}}>
          <img
            className="user-avatar rounded-circle mr-2"
            src={photoURL}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{displayName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">person</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="settings">
            <i className="material-icons">settings</i> Settings
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to='/' onClick={()=>auth.signOut()} className="text-danger">
            <i className="material-icons text-danger">exit_to_app</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(UserActions)
