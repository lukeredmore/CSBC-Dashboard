import React from "react";
import "./MinimalistInputField.scss";

const MinimalistInputField = ({ className, ...otherProps }) => (
  <div className={`minimalist-input-field ${className ? className : ""}`}>
    <input {...otherProps} />
  </div>
);

export default MinimalistInputField;
