import React from "react";

import "./HeaderItems.scss";

import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";
import { getDataFromRef, writeToRef } from "../../firebase";
import { isMobile, isIE, isSafari } from "react-device-detect";

class HeaderItems extends React.Component {
  state = {
    dropdownShown: false,
    normalAlertOverride: false
  };

  async componentDidMount() {
    let exisitingLocation = await getDataFromRef(
      "Users/" + this.props.uid + "/location"
    );
    if (exisitingLocation && exisitingLocation !== "") {
      this.props.onLocationUpdate(exisitingLocation);
    } else this.updateLocation();
  }

  updateLocation = () => {
    const { onLocationUpdate, location } = this.props;
    let newLocation;
    if (location) {
      newLocation = prompt("Please enter a location", location);
      if (!newLocation || newLocation === "" || newLocation === location)return
    } else {
      do {
        newLocation = prompt("Please enter a location");
      } while (!newLocation || newLocation === "");
    }
    onLocationUpdate(newLocation);
    writeToRef("Users/" + this.props.uid + "/location", newLocation);
  };

  componentWillReceiveProps(nextProps) {
    const { responseArray } = nextProps;
    if (
      responseArray &&
      responseArray.length > 0 &&
      responseArray !== this.props.responseArray &&
      responseArray[0].status !== 200
    )
      this.setState({ normalAlertOverride: false });
  }

  failedEvents = () =>
    this.props && !this.state.normalAlertOverride
      ? this.props.responseArray.find(e => e.status !== 200)
      : null;

  toggleDropdown = () =>
    this.setState({
      dropdownShown: !this.state.dropdownShown,
      normalAlertOverride: true
    });

  render() {
    const { signOutStart, location, history, responseArray } = this.props;
    return (
      <span className="header-items">
        {!isMobile && !isIE && !isSafari && (
          <span className={`alerts ${this.failedEvents() ? "failed" : ""}`}>
            <i className="material-icons" onClick={this.toggleDropdown}>
              {this.failedEvents() ? "notification_important" : "notifications"}
            </i>
            {this.state.dropdownShown && (
              <div className="alerts-dropdown">
                {responseArray.length > 0 ? (
                  responseArray.map((e, i) => (
                    <div
                      key={i}
                      className={`alert-row ${
                        e.status !== 200 ? "failed-message" : ""
                      }`}
                    >
                      {e.message}
                    </div>
                  ))
                ) : (
                  <div className="empty-data">Nothing to see here!</div>
                )}
              </div>
            )}
          </span>
        )}
        {!isMobile && !isIE && location && (
          <span className="logout" onClick={this.updateLocation}>
            {`Location: ${location}`}
          </span>
        )}
        <span className="help" onClick={() => history.push("/help")}>
          Help
        </span>
        <span className="logout" onClick={signOutStart}>
          Log Out
        </span>
      </span>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(null, mapDispatchToProps)(HeaderItems);
