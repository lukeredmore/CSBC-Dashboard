import React from "react";
import { Card, Row, Col, Button } from "shards-react";
import './LoginPage.styles.scss'
import Logo from '../assets/lettermark.png'
import 'dotenv/config'

import {signInWithGoogle } from '../firebase'
console.log(process.env.FIREBASE_API_KEY)
const LoginPage = () => (
  <div className="vertical-center">
    <Row className="form-row">
      <Col lg="4" md="6" sm="10" className="form-col">
        <div className="image-container">
          <img
          src={Logo}
          alt='logo'
            className="logo-image"
          />
        </div>
        <Card className='login-card'>
        <h3>CSBC Dashboard</h3>
        <p>To access the dashboard, please sign in with your Diocesean-provided Google Account. Only authorized administrators will be granted access.</p>

              <Button block size='lg' theme="primary" onClick={signInWithGoogle}>
                <i className="fa fa-external-link-alt" /> Sign In With Google
              </Button>
              <a href='mailto:csbcappissues@gmail.com'>Report An Issue</a>
        </Card>
      </Col>
    </Row>
  </div>
)

export default LoginPage