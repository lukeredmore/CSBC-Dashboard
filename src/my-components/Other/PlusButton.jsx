import React from 'react'
import './PlusButton.scss'

const PlusButton = ({className, onClick}) => (
  <div className={'plus-button ' + className} onClick={onClick}>
    <i className="material-icons">
      add
    </i>
  </div>
)

export default PlusButton