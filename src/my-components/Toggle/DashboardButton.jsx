import React from "react";

import "./DashboardButton.scss";

import { Button } from 'shards-react'

const DashboardButton = ({onClick}) => {
  return (
    <Button className="dashboard-button" onClick={onClick}>
      <i className="fa fa-external-link-alt" />
      {" Admin Dashboard"}
    </Button>
  );
};

export default DashboardButton;
