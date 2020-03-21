import React from 'react'
import './PlusButton.scss'

const PlusButton = props => (
  <div className = 'plus-button' onClick={props.onClick}>
    <i className="material-icons">
      add
    </i>
  </div>
)

export default PlusButton