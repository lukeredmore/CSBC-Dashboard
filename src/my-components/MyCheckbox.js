import React from "react";

import './MyCheckbox.scss'

const MyCheckbox = ({ onChange, checked }) => {
  return (
    <span
      className={`my-checkbox ${checked ? "checked" : ""}`}
      onClick={onChange}
    >
      <i className="material-icons">done</i>
    </span>
  );
};

export default MyCheckbox;
