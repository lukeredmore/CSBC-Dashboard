import React from 'react'
import './MinimalistInputField.scss'

const MinimalistInputField = ({
  handleChange,
  label,
  value,
  ...otherProps
}) => (
  <div className="minimalist-input-field">
    <input className={`search-field ${value ? " has-text" : ""}`} onChange={handleChange} {...otherProps} />
    <i className="material-icons search-icon">search</i>
  </div>
)

export default MinimalistInputField