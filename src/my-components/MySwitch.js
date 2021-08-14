import React from 'react'

import './MySwitch.scss'

export default ({ onChange, checked, disabled }) => {
  const randomIdentifier = Math.random()

  return (
    <span
      className={`my-switch${disabled ? ' disabled' : ''}`}
      onClick={e => {
        if (!disabled) {
          e.stopPropagation()
          onChange()
        }
      }}>
      <input type='checkbox' disabled id={randomIdentifier} checked={checked} />

      <label htmlFor={randomIdentifier} />
    </span>
  )
}
