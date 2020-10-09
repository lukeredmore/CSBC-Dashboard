import React, { useState, useEffect } from 'react'

import { Modal, Button } from 'shards-react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import './CalendarModal.scss'

export default ({ startDate, endDate, onClose, selectedDates: selectedDatesProp }) => {
  const [selectedDates, setSelectedDates] = useState(null)

  useEffect(() => {
    if (selectedDatesProp === null) return
    setSelectedDates(selectedDatesProp)
  }, [selectedDatesProp])

  const onDayClick = (date, modifiers) => {
    if (modifiers.disabled) return
    let dateString = date.toISOString().split('T')[0]
    let filteredArray = selectedDates.filter(e => e !== dateString)
    if (filteredArray.length !== selectedDates.length) {
      setSelectedDates(filteredArray)
    } else {
      setSelectedDates([...selectedDates, dateString])
    }
  }

  const confirmCancelAndClose = () => {
    if (
      arraysEqualWhenSorted(selectedDates, selectedDatesProp) ||
      window.confirm('You have unsaved changes. Are you sure you want to cancel?')
    )
      onClose()
  }

  if (selectedDatesProp === null || selectedDates === null) return null
  return (
    <div className='calendar-modal'>
      <Modal open toggle={confirmCancelAndClose}>
        <div className='header border-bottom pb-2'>
          <h5>Select dates:</h5>
          <div className='button-container'>
            <Button theme='danger' onClick={confirmCancelAndClose}>
              Cancel
            </Button>
            <Button onClick={() => onClose(selectedDates)}>Save</Button>
          </div>
        </div>
        <DayPicker
          canChangeMonth={false}
          numberOfMonths={10}
          initialMonth={new Date(startDate + 'T14:00:00.000Z')}
          disabledDays={[
            { daysOfWeek: [0, 6] },
            {
              after: new Date(endDate + 'T14:00:00.000Z'),
              before: new Date(startDate + 'T14:00:00.000Z')
            }
          ]}
          selectedDays={selectedDates.map(e => new Date(e + 'T14:00:00.000Z'))}
          onDayClick={onDayClick}
        />
      </Modal>
    </div>
  )
}

const arraysEqualWhenSorted = (first, second) => {
  const a = first?.sort()
  const b = second?.sort()
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index])
}
