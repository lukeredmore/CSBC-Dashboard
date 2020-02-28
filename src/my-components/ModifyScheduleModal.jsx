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
    this.setState({ data: this.props.data })
  }

  discardChangesAndClose = () => {
    this.setState({ data: null })
    this.props.onCancel()
  }
  saveChangesAndClose = () => {
    this.props.onClose(this.state.data)
    this.setState({ data: null })
  }
  handleChangeOfTime = (event) => {
    const { value, name } = event.target
    let newData = this.state.data
    newData.times[name] = value
    this.setState({ data : newData})
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
          <Form onSubmit={this.saveChangesAndClose}>
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
