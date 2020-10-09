import React, { useState, useEffect } from 'react'

import './SingleItemEditor.scss'

import { Form, FormInput, FormSelect } from 'shards-react'
// import InlineLoadingSymbol from '../InlineLoadingSymbol'

const SingleItemEditor = ({ onSubmit, type, placeholder, prefix, editable, className, dropdownOptions, value }) => {
  const [newValue, setNewValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uniqueId, setUniqueId] = useState(0)
  const [editorWidth, setEditorWidth] = useState(0)

  const handleChange = ({ target: { value } }) => setNewValue(value)

  useEffect(() => setUniqueId(String(Math.random())), [])

  const prepareForSubmit = e => {
    e.preventDefault()
    onSubmit(newValue, setLoading)
    setNewValue(null)
  }

  let textToShow = value
  if (dropdownOptions) {
    const mine = dropdownOptions.find(e => e.value === value)
    textToShow = mine ? mine.displayName : dropdownOptions[0].displayName
  }
  return (
    <div
      className={`single-item-editor ${newValue || !editable ? '' : 'clickable'} ${className}`}
      onClick={() => {
        const width = document.getElementById(uniqueId)?.clientWidth
        if (width) setEditorWidth(width + 45)
        if (!newValue && editable) {
          setNewValue(value)
        }
      }}>
      {placeholder && (
        <span className='single-item-label'>
          {placeholder + ': '}
          {loading ? '<InlineLoadingSymbol />' : null}
        </span>
      )}
      {!loading && newValue ? (
        <div className='editor-container'>
          <div
            className='cover'
            onClick={e => {
              e.stopPropagation()
              setNewValue(null)
            }}
          />
          <Form onSubmit={prepareForSubmit}>
            {prefix && <span>{prefix}</span>}
            {dropdownOptions ? (
              <FormSelect style={{ width: editorWidth + 'px' }} name='value' value={newValue} required onChange={handleChange}>
                {dropdownOptions.map(({ value, displayName }, i) => (
                  <option key={i} value={value}>
                    {displayName}
                  </option>
                ))}
              </FormSelect>
            ) : (
              <FormInput
                className='editor'
                type={type}
                style={{ width: editorWidth + 'px' }}
                autoFocus
                autoComplete='off'
                placeholder={placeholder}
                name='value'
                required
                value={newValue}
                onChange={handleChange}
              />
            )}
            <label className='icon-container'>
              <i className='material-icons clickable' title='Save'>
                check_circle
              </i>
              <input style={{ display: 'none' }} type='submit' />
            </label>
            <i className='material-icons clickable' title='Cancel' style={{ transform: 'rotate(45deg)' }} onClick={() => setNewValue(null)}>
              add_circle
            </i>
          </Form>
        </div>
      ) : !loading ? (
        <span id={uniqueId} className='value-displayer'>
          {(prefix ? prefix : '') + textToShow}
        </span>
      ) : null}
    </div>
  )
}

export default SingleItemEditor
