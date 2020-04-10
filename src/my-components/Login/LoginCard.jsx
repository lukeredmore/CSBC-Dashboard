import React from 'react'

import { signInStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

import { Card, Button } from 'shards-react'
import Logo from "../../assets/lettermark.png";

import './LoginCard.scss'

const LoginCard = ({ signInStart }) => (
  <div className='login-card'>
    <div className="image-container">
      <img src={Logo} alt="logo" className="logo-image" />
    </div>
    <Card>
      <h3>CSBC Dashboard</h3>
      <p>
        To access the dashboard, please sign in with your Diocesean-provided
        Google Account. Only authorized teachers and administrators will be granted access.
      </p>

      <Button block size="lg" theme="primary" onClick={signInStart}>
        <i className="fa fa-external-link-alt" /> Sign In With Google
      </Button>
      <a href="/help">Report An Issue</a>
    </Card>
  </div>
);

const mapDispatchToProps = dispatch => ({
    signInStart: () => dispatch(signInStart())
})

export default connect(null, mapDispatchToProps)(LoginCard)