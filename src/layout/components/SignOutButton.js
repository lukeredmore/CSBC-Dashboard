import React from "react";
import { DropdownItem } from "shards-react";
import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";

const SignOutButton = ({ signOut }) => (
  <DropdownItem to="/" onClick={signOut} className="text-danger">
    <i className="material-icons text-danger">exit_to_app</i> Logout
  </DropdownItem>
);

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutStart())
});
export default connect(null, mapDispatchToProps)(SignOutButton);
