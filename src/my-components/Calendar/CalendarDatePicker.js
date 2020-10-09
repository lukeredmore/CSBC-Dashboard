import React from 'react'
import { Card, CardHeader, CardBody, FormInput, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from 'shards-react'

import { writeToRef, getContinuousDataFromRef } from '../../firebase'
import CalendarModal from './CalendarModal'

import LoadingSymbol from '../Login/LoadingSymbol'

import './CalendarDatePicker.scss'

class CalendarDatePicker extends React.Component {
  state = {
    selectedDates: null,
    dates: null,
    currentlyEditing: ''
  }

  componentDidMount() {
    getContinuousDataFromRef('Dates', dates => {
      const datesArray = [
        {
          title: 'No school days (Holidays, In-Service Days, etc.)',
          identifier: 'noSchoolDays',
          selectedDates: dates.noSchoolDays
        },
        {
          title: 'No high school days (Midterms, Finals, etc.)',
          identifier: 'noHighSchoolDays',
          selectedDates: dates.noHighSchoolDays
        },
        {
          title: 'No elementary school days (Parent-Teacher Conferences, etc.)',
          identifier: 'noElementarySchoolDays',
          selectedDates: dates.noElementarySchoolDays
        },
        {
          title: 'Snow days (only when school is completely closed/no day schedule is observed)',
          identifier: 'snowDays',
          selectedDates: dates.snowDays
        }
      ]

      this.setState({
        dates: { datesArray, startDate: dates.startDate, endDate: dates.endDate },
        selectedDates: null,
        currentlyEditing: ''
      })
    })
  }

  onModalClose = async data => {
    if (data) {
      await writeToRef('Dates/' + this.state.currentlyEditing, data.sort())
    }
    this.setState({ selectedDates: null, currentlyEditing: '' })
  }

  handleSingleDateChange = async e => {
    const { name, value } = e.target
    await writeToRef('Dates/' + name, value)
  }

  render() {
    if (this.state.dates) {
      return (
        <div className='calendar-date-picker'>
          <Card>
            <CardHeader className='border-bottom'>
              <h5 style={{ margin: '0' }}>Edit No School Days</h5>
            </CardHeader>
            <CardBody>
              <br />
              <i>For COVID-19 related closures, please do not put them under 'Snow Days'.</i>
              <br />
              <br />
              Use this tool to keep the calendar that governs the CSBC app up to date. This calendar controls the day schedule, so every
              date selected on this page (with the exception of the first and last day) will be skipped when calculating the day schedule.
              As the high school is on a different schedule than the elementary schools, there are separate fields to modify each
              individually. If the day schedule is ever incorrect, please look at this page to diagnose the issue.
              <Row>
                <Col lg='6'>
                  <div className='date-editor-label'>School Start Date</div>
                </Col>
                <Col lg='6'>
                  <div className='dates-form-container'>
                    <InputGroup>
                      <FormInput type='date' name='startDate' onChange={this.handleSingleDateChange} value={this.state.dates.startDate} />
                      <InputGroupAddon type='append'>
                        <InputGroupText>
                          <i className='material-icons'>date_range</i>
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </Col>
              </Row>
              {this.state.dates.datesArray.map((e, index) => (
                <Row key={index}>
                  <Col lg='6'>
                    <div className='date-editor-label'>{e.title}</div>
                  </Col>
                  <Col lg='6'>
                    <div
                      className='dates-form-container'
                      onClick={() =>
                        this.setState({
                          selectedDates: e.selectedDates ? e.selectedDates : [],
                          currentlyEditing: e.identifier
                        })
                      }>
                      <InputGroup>
                        <FormInput disabled value='Click to see all....' />
                        <InputGroupAddon type='append'>
                          <InputGroupText>
                            <i className='material-icons'>date_range</i>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              ))}
              <Row>
                <Col lg='6'>
                  <div className='date-editor-label'>School End Date</div>
                </Col>
                <Col lg='6'>
                  <div className='dates-form-container'>
                    <InputGroup>
                      <FormInput type='date' name='endDate' onChange={this.handleSingleDateChange} value={this.state.dates.endDate} />
                      <InputGroupAddon type='append'>
                        <InputGroupText>
                          <i className='material-icons'>date_range</i>
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <CalendarModal
            selectedDates={this.state.selectedDates}
            startDate={this.state.dates.startDate}
            endDate={this.state.dates.endDate}
            onClose={this.onModalClose}
          />
        </div>
      )
    } else return <LoadingSymbol />
  }
}
export default CalendarDatePicker
