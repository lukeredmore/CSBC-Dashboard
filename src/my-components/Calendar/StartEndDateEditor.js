import React from 'react'
import { Card, CardHeader, CardBody, FormInput, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from 'shards-react'

import { writeToRef, getContinuousDataFromRef } from '../../firebase'

import LoadingSymbol from '../Login/LoadingSymbol'

import './StartEndDateEditor.scss'

class CalendarDatePicker extends React.Component {
  state = {
    dates: null,
  }

  componentDidMount() {
    getContinuousDataFromRef('Dates', dates => {
      this.setState({
        dates: { startDate: dates.startDate, endDate: dates.endDate },
      })
    })
  }

  handleSingleDateChange = async e => {
    const { name, value } = e.target
    await writeToRef('Dates/' + name, value)
  }

  render() {
    if (this.state.dates) {
      return (
        <div className='start-end-date-editor'>
          <Card>
            <CardHeader className='border-bottom'>
              <h5 style={{ margin: '0' }}>Edit Start and End Dates</h5>
            </CardHeader>
            <CardBody>
              <br />
              Here you can set the start and end of each new school year. Note that once you change this to a new year, all previous "no school dates" will be lost and need to be re-entered for the new school year. You may need to refresh the page to see the updated calendar above.
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
        </div>
      )
    } else return <LoadingSymbol />
  }
}
export default CalendarDatePicker
