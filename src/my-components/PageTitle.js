import React from "react";

import "./PageTitle.scss";

const PageTitle = ({ title, subtitle }) => (
  <div className="my-page-title">
    <span className="page-subtitle">{subtitle.toUpperCase()}</span>
    <h3 className="page-title">{title}</h3>
  </div>
);

export default PageTitle;
