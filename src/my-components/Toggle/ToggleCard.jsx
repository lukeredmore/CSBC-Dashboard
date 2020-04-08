import React from "react";
import { Card, CardBody } from "shards-react";

import "./ToggleCard.scss";
import {
  sendAuthenticatedPostRequest,
  getDataFromRef,
  writeToRef
} from "../../firebase";
import constants from "../../client-side-private-files.json";
import { connect } from "react-redux";

class ToggleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      location: "",
      editingLocation: false
    };
    this.idInput = React.createRef();
  }

  focus = () => {
    if (!this.state.editingLocation) this.idInput.current.focus();
  };

  componentDidUpdate() {
    this.focus();
  }
  async componentDidMount() {
    console.log(this.props.uid);
    this.focus();
    let location = await getDataFromRef(
      "Users/" + this.props.id + "/toggleLocation"
    );
    if (location) {
      this.setState({ location });
    } else {
      let newLocation;
      do {
        newLocation = prompt("Please enter a location");
      } while (newLocation == null || newLocation === "");
      await writeToRef(
        "Users/" + this.props.id + "/toggleLocation",
        newLocation
      );
      this.setState({ location: newLocation });
    }
  }

  handleIDChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: this.validateValue(value) }, async () => {
      const { id } = this.state;
      if (id.length === 10) {
        console.log("Location is " + this.state.location);
        let response = await sendAuthenticatedPostRequest(
          constants.FIREBASE_TOOGLE_FUNCTION_URL,
          { id, location: this.state.location, forceSign: "toggle" }
        );
        console.log(response);
        this.setState({ id: "" });
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
      <div className="toggle-card-container" onClick={this.focus}>
        <div className="toggle-card">
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
              <div className='footer'>
                <span className="location-container">
                  {this.state.editingLocation ? (
                    <input
                      className="form-control location-editor"
                      name="location"
                      autoComplete="off"
                      value={this.state.location}
                      onChange={this.handleLocationChange}
                    />
                  ) : (
                    <span className="location-displayer">
                      {this.state.location}
                    </span>
                  )}
                  <i
                    className="material-icons edit-location-button"
                    onClick={async () => {
                      if (this.state.location && this.state.location !== "") {
                        if (this.state.editingLocation)
                          await writeToRef(
                            "Users/" + this.props.id + "/toggleLocation",
                            this.state.location
                          )
                          else setTimeout(() => this.setState({
                          editingLocation: false
                        }), 30000)
                        this.setState({
                          editingLocation: !this.state.editingLocation
                        });
                      } else {
                        alert("Please enter a location");
                      }
                    }}
                  >
                    {this.state.editingLocation ? "check_circle" : "edit"}
                  </i>
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.user.currentUser.id
});

export default connect(mapStateToProps)(ToggleCard);
