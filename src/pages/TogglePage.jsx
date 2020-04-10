import React from "react";
import ToggleCard from "../my-components/Toggle/ToggleCard";
import HeaderItems from "../my-components/Toggle/HeaderItems";
import DashboardButton from "../my-components/Toggle/DashboardButton";
import CopyrightText from "../my-components/Toggle/CopyrightText";

import { connect } from "react-redux";

class TogglePage extends React.Component {
  state = {
    location: null,
    responseArray: []
  };

  render() {
    const {
      state: { location, responseArray },
      props: { history, dashboardAccess, id }
    } = this;
    return (
      <div>
        <ToggleCard
          location={location}
          onResponseReceived={response => this.setState({ responseArray: [response, ...responseArray] })}
        />
        <HeaderItems
          uid={id}
          location={location}
          onLocationUpdate={location => this.setState({ location })}
          history={history}
          responseArray={responseArray}
        />
        <CopyrightText />
        {dashboardAccess ? (
          <DashboardButton onClick={() => history.push("/admin")} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  dashboardAccess: currentUser.dashboardAccess,
  id: currentUser.id
});

export default connect(mapStateToProps)(TogglePage);
