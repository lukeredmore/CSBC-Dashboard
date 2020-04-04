import React from "react"
import { Card, Row, Col, Button } from "shards-react"
import "./LoginPage.styles.scss"
import Logo from "../assets/lettermark.png"

import LoadingDots from "../my-components/LoadingDots"

import { signInStart } from "../redux/user/user.actions"
import { connect } from "react-redux"

class LoginPage extends React.Component {
  state = {
    loading: true
  }

  loadingTimeout = null
  componentDidMount() {
    this.loadingTimeout = window.setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  }
  componentWillUnmount() {
    window.clearTimeout(this.loadingTimeout);
  }

  render() {
    return (
      <div className="vertical-center">
        <Row className="form-row">
          <Col lg="4" md="6" sm="10" className="form-col">
            {this.state.loading ? (
              <LoadingDots className="loading" />
            ) : (
              <div>
                <div className="image-container">
                  <img src={Logo} alt="logo" className="logo-image" />
                </div>
                <Card className="login-card">
                  <h3>CSBC Dashboard</h3>
                  <p>
                    To access the dashboard, please sign in with your
                    Diocesean-provided Google Account. Only authorized
                    administrators will be granted access.
                  </p>

                  <Button
                    block
                    size="lg"
                    theme="primary"
                    onClick={this.props.signIn}
                  >
                    <i className="fa fa-external-link-alt" /> Sign In With
                    Google
                  </Button>
                  <a href="mailto:csbcappissues@gmail.com">Report An Issue</a>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(signInStart())
})
export default connect(null, mapDispatchToProps)(LoginPage)
