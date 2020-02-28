import React from "react"
import "./ModifyScheduleModal.scss"

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  FormInput,
} from "shards-react"

class ModifyScheduleModal extends React.Component {
  state = {
    data: null
  }

  componentDidMount() {
    this.setState({ data: this.props.data })
  }

  discardChangesAndClose = () => {
    this.props.onClose(this.state.data)
    this.setState({ data: null })
  }
  handleChange = event => {
    const { value, name } = event.target
    let data = this.state.data
    data[name] = value
    this.setState({data: data})
  }

  render() {
    if (this.state.data) {
      return (
        <Modal open={true} toggle={this.props.toggle}>
          <ModalHeader>{this.state.data.title}</ModalHeader>
          <ModalBody>
            <FormInput name='title' onChange={this.handleChange} value={this.state.data.title}></FormInput>
            👋 Hello there! Click to close
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.discardChangesAndClose}>Done</Button>
          </ModalFooter>
        </Modal>
      )
    } else return <div></div>
  }
}

export default ModifyScheduleModal
