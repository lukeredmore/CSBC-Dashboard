import React from 'react'

import './ButtonIcon.scss'

const ButtonIcon = ({ icon, title, onClick }) => (
    <i title={title ? title : icon} className="material-icons button-icon" onClick={onClick}>
      {icon}
    </i>
)

export default ButtonIcon