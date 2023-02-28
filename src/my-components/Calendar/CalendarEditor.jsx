import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody} from 'shards-react'

import { writeToRef, getDataFromRef, getContinuousDataFromRef } from '../../firebase'

import LoadingSymbol from '../Login/LoadingSymbol'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import CalendarLegend from './CalendarLegend'

class CalendarEditor extends React.Component {
  state = {
    startDate: null,
    endDate: null,
  }

  componentDidMount() {
    getDataFromRef("Dates").then(dates => {
      this.setState({
        startDate: dates.startDate, 
        endDate: dates.endDate,
      })
    })
  }

  render() {
    if (this.state.startDate == null) return <LoadingSymbol />
    return (
      <div className='calendar-date-picker'>
        <Card>
          <CardHeader className='border-bottom'>
            <h5 style={{ margin: '0' }}>Edit School Calendar</h5>
          </CardHeader>
          <CardBody>
            Use this tool to keep the calendar that governs the CSBC app up to date. This calendar controls the day schedule, so every
            date selected on this page will be skipped when calculating the day schedule. 
            Click any day to cycle through the closure options. Please make sure you select the right one, as the elementary and high schools are on different day schedules. If the day schedule is ever incorrect, please look at this page to diagnose the issue.
            <CalendarLegend />
            <DayPickerCal
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onSave={(obj) => {
                  const objToSave = {
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    ...obj
                  }
                  writeToRef("Dates", objToSave)
                }}/>
          </CardBody>
        </Card>
      </div>
    )
  }
}


const DayPickerCal = ({ startDate, endDate, onSave }) => {
  useEffect(() => {
    let isMounted = true;  
    getContinuousDataFromRef('Dates', dates => {  
        const noSchool = (dates.noSchoolDays || []).map(e => new Date(e + "T14:00:00.000Z"))
        const noHighSchool =(dates.noHighSchoolDays || []).map(e => new Date(e + "T14:00:00.000Z"))
        const noElementarySchool = (dates.noElementarySchoolDays || []).map(e => new Date(e + "T14:00:00.000Z"))
        const snow = (dates.snowDays || []).map(e => new Date(e + "T14:00:00.000Z"))
        if (!isMounted) return
        setRedDates(noSchool)
        setBrownDates(noElementarySchool)
        setPurpleDates(noHighSchool)
        setBlueDates(snow)
      })
      return () => { isMounted = false };
  }, [])

  const [redDates, setRedDates] = useState([])
  const [brownDates, setBrownDates] = useState([])
  const [purpleDates, setPurpleDates] = useState([])
  const [blueDates, setBlueDates] = useState([])
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (!clicked) return
    console.log("dates changed from click")
    const dateToDateString = date => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Add 1 to the month value to get a 1-based index
      const day = date.getDate();
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  
    setClicked(false)
    onSave({
      noSchoolDays: redDates.map(dateToDateString).sort(),
      noElementarySchoolDays: brownDates.map(dateToDateString).sort(),
      noHighSchoolDays: purpleDates.map(dateToDateString).sort(),
      snowDays: blueDates.map(dateToDateString).sort(),
    })
  }, [redDates, brownDates, purpleDates, blueDates])


 return <><DayPicker
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
  modifiers={{
    redDates, 
    brownDates,
    purpleDates,
    blueDates
  }}
  modifiersStyles={{
    redDates: {
      color: 'white',
      backgroundColor: 'red',
    },
    brownDates: {
      color: 'white',
      backgroundColor: 'brown'
    },purpleDates: {
      color: 'white',
      backgroundColor: 'purple'
    },blueDates: {
      color: 'white',
      backgroundColor: 'blue'
    },
  }}
  onDayClick={(date, modifiers) => {
    setClicked(true)
    if (modifiers.disabled) return

    if (redDates.find(e => e.toDateString() == date.toDateString())) {
      // console.log("switching from red to brown")
      setRedDates(redDates.filter(e => e.toDateString() !== date.toDateString()))
      setBrownDates([...brownDates, date].sort())
    } else if (brownDates.find(e => e.toDateString() == date.toDateString())) {
      // console.log("switching from brown to purple")
      setBrownDates(brownDates.filter(e => e.toDateString() !== date.toDateString()))
      setPurpleDates([...purpleDates, date].sort())
    } else if (purpleDates.find(e => e.toDateString() == date.toDateString())) {
      // console.log("switching from purple to blue")
      setPurpleDates(purpleDates.filter(e => e.toDateString() !== date.toDateString()))
      setBlueDates([...blueDates, date].sort())
    } else if (blueDates.find(e => e.toDateString() == date.toDateString())) {
      // console.log("switching from blue to default")
      setBlueDates(blueDates.filter(e => e.toDateString() !== date.toDateString()))
    } else {
      // console.log("switching from default to red")
      setRedDates([...redDates, date].sort())
    }
  }}/>
</>
}

export default CalendarEditor
