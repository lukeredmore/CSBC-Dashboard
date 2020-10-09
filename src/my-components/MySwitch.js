import React from "react";

import "./MySwitch.scss";

export default ({ onChange, checked }) => {
  const randomIdentifier = Math.random()

  return (
    <span className="my-switch" onClick={(e) => {
      e.stopPropagation()
      onChange()}}>
      <input
        type="checkbox"
        disabled
        id={randomIdentifier}
        checked={checked}
      />

      <label htmlFor={randomIdentifier} />
    </span>
  );
};
