import React from "react";
import ToggleCard from "../my-components/Toggle/ToggleCard";
import LogoutButton from "../my-components/Toggle/LogoutButton";
import DashboardButton from "../my-components/Toggle/DashboardButton";
import CopyrightText from '../my-components/Toggle/CopyrightText'


import { connect } from "react-redux";

const TogglePage = ({history, dashboardAccess}) => {
  return (
    <div>
      <ToggleCard />
      <LogoutButton />
      <CopyrightText />
      {dashboardAccess ? (
        <DashboardButton onClick={() => history.push("/admin")} />
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  dashboardAccess: state.user.currentUser.dashboardAccess
});

export default connect(mapStateToProps)(TogglePage);
