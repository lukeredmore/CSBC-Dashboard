import React from "react"
import "./ModifyScheduleModal.scss"

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter, 
  FormInput,
  Form
} from "shards-react"

class ModifyScheduleModal extends React.Component {
  state = {
    data: null
  }

  componentDidMount() {
    const dataProp = { ...this.props.data }
    if (dataProp && Object.entries(dataProp).length !== 0) {
      this.setState({ data: dataProp })
    }
  }

  discardChangesAndClose = () => {
    this.props.onCancel(this.state.data.id)
    this.setState({ data: null })
  }
  saveChangesAndClose = e => {
    e.preventDefault()
  }
  handleChangeOfTime = event => {
    const { value, name } = event.target
    let newData = this.state.data
    newData.times[name] = value
    this.setState({ data: { ...newData } })
  }

  validateTimes = arr => {
    for (var i = 1; i < arr.length; i++) {
      let previousNum = Number(arr[i - 1].replace(":", ""))
      let currentNum = Number(arr[i].replace(":", ""))
      if (previousNum && currentNum) {
        if (previousNum >= currentNum) {
          return false
        }
      } else {
        return false
      }
    }
    return true
  }

  validateBeforeSubmit = e => {
    e.preventDefault()
    if (this.validateTimes(this.state.data.times)) {
      this.props.onSubmit()
      this.setState({ data: null })
    } else {
      alert("Ensure that all times are entered sequentially.")
    }
  }

  periodLabels = [
    "First Bell",
    "Period 1",
    "Period 2",
    "Period 3",
    "Period 4",
    "Period 5",
    "Period 6",
    "Period 7",
    "Period 8",
    "Period 9"
  ]

  render() {
    if (this.state.data) {
      return (
        <Modal open={true} toggle={this.props.toggle}>
          <ModalHeader>{this.state.data.title}</ModalHeader>
          <Form onSubmit={this.validateBeforeSubmit}>
            <ModalBody>
              Unless otherwise specified, please enter the time each period
              ENDS. The system can figure out the rest.
              {this.periodLabels.map((label, index) => (
                <div key={index} className="schedule-editor-row">
                  <span className="all-inputs period-label">{label}</span>
                  <FormInput
                    className="all-inputs time-input"
                    value={this.state.data.times[index]}
                    type="time"
                    min="07:00"
                    max="16:00"
                    required
                    name={index}
                    onChange={this.handleChangeOfTime}
                  />
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button theme="danger" onClick={this.discardChangesAndClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </ModalFooter>
          </Form>
        </Modal>
      )
    } else return <div></div>
  }
}

export default ModifyScheduleModal
