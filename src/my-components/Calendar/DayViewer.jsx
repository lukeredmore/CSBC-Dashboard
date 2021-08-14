import React, { useState, useEffect } from 'react'
import { Row, Col } from 'shards-react'
import { getContinuousDataFromRef } from '../../firebase'
import './DayViewer.scss'

export default () => {
  const setDayScheduleRef = useState(null)[1]
  const [daySchedule, setDaySchedule] = useState(null)
  const [dateToShow, setDateToShow] = useState(new Date().toISOString())

  useEffect(() => {
    setDayScheduleRef(
      getContinuousDataFromRef('DaySchedule', daySched => {
        setDaySchedule(daySched)
      })
    )

    return () => {
      setDayScheduleRef(null)
    }
  }, [])

  if (!daySchedule) return null
  return (
    <div className='day-viewer mt-3 mb-3'>
      <div className='date-header'>
        <i className='material-icons day-change-arrow-icon'>navigate_before</i>
        {dateToShow.split('T')[0] === new Date().toISOString().split('T')[0]
          ? 'Today'
          : new Date(dateToShow).toLocaleDateString('en-us', {
              timeZone: 'America/New_York',
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
        <i className='material-icons day-change-arrow-icon'>navigate_next</i>
        <div
          className='prev-day-hitbox'
          onClick={() => {
            let previousDay = new Date(dateToShow)
            previousDay.setDate(previousDay.getDate() - 1)
            setDateToShow(previousDay.toISOString())
          }}
        />
        <div
          className='next-day-hitbox'
          onClick={() => {
            let nextDay = new Date(dateToShow)
            nextDay.setDate(nextDay.getDate() + 1)
            setDateToShow(nextDay.toISOString())
          }}
        />
      </div>

      <Row>
        <Col md='6'>
          <div className='day-label'>DAY</div>
          <div className='day-value'>
            {daySchedule.highSchool[dateToShow?.split('T')[0]] ? daySchedule.highSchool[dateToShow?.split('T')[0]] : 'N/A'}
          </div>
          <div className='school-label'>Seton Catholic Central</div>
        </Col>
        <Col md='6'>
          <div className='day-label'>DAY</div>
          <div className='day-value'>
            {daySchedule.elementarySchool[dateToShow?.split('T')[0]] ? daySchedule.elementarySchool[dateToShow?.split('T')[0]] : 'N/A'}
          </div>
          <div className='school-label'>Elementary Schools</div>
        </Col>
      </Row>
    </div>
  )
}
