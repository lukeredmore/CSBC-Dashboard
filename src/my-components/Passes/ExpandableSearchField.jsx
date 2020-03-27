import React from 'react'
import "./ExpandableSearchField.scss";

const ExpandableSearchField = ({
  handleChange,
  label,
  value,
  className,
  ...otherProps
}) => (
  <div className={"expandable-search-field " + className} title="Search">
    <input className={`search-field ${value ? " has-text" : ""}`} onChange={handleChange} {...otherProps} />
    <i className="material-icons search-icon">search</i>
  </div>
)

export default ExpandableSearchField;