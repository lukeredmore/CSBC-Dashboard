import React from "react";
import { Card, CardBody } from "shards-react";
import { isMobileOnly, isIE } from "react-device-detect";

import "./ToggleCard.scss";
import { sendAuthenticatedPostRequest } from "../../firebase";
import constants from "../../client-side-private-files.json";

class ToggleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
    this.idInput = React.createRef();
  }

  focus = () => {
    if (
      this.idInput.current &&
      document.activeElement !== this.idInput.current
    ) {
      this.idInput.current.focus();
    }
  };

  componentWilUnmount() {
    window.removeEventListener("focus", this.focus);
  }

  componentDidUpdate() {
    this.focus();
  }
  componentDidMount() {
    this.focus();
    window.addEventListener("focus", this.focus);
  }

  handleIDChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: this.validateValue(value) }, async () => {
      const { id } = this.state;
      if (id.length === 10) {
        this.setState({ id: "" });
        let response = await sendAuthenticatedPostRequest(
          constants.FIREBASE_TOOGLE_FUNCTION_URL,
          {
            id,
            location: this.props.location,
            forceSign: "toggle" /*REMOVE FORCESIGN WHEN LIVE*/
          }
        );
        this.props.onResponseReceived(response);
        console.log(response);
      }
    });
  };

  validateValue = val => {
    const num = Number(val);
    if (isNaN(num)) return "";
    if (num < 0) return "";
    if (val.length > 10) return "";
    return val;
  };

  handleLocationChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div
        className="toggle-card-container"
        onClick={this.focus}
        onMouseMove={this.focus}
      >
        <div className="center-container">
          {isMobileOnly ? (
            <div className="invalid-device">
              To use this system, this device must support an external keyboard.
            </div>
          ) : isIE ? (
            <div className="invalid-device">
              To use this system, please use Google Chrome or another supported browser.
            </div>
          ) : (
            <Card>
              <CardBody className="pt-3 pb-3">
                <div className="title mb-3">Student ID</div>
                <input
                  className="form-control scan-entry-input"
                  name="id"
                  autoComplete="off"
                  ref={this.idInput}
                  value={this.state.id}
                  onChange={this.handleIDChange}
                />
                <div className="mt-2 status-text">
                  Scan an ID to sign in or out
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    );
  }
}

export default ToggleCard;
