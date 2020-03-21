import React from "react"
import './AddStudentModal.scss'

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  FormInput,
  Form
} from "shards-react"

class AddStudentModal extends React.Component {
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
    this.props.onCancel()
    this.setState({ data: null })
  }
  handleChange = event => {
    const { value, name } = event.target
    let newData = this.state.data
    newData[name] = value
    this.setState({ data: { ...newData } })
  }

  submit = e => {
    e.preventDefault()
      this.props.onSubmit(this.state.data)
      this.setState({ data: null })
  }

  render() {
    if (this.state.data) {
      return (
        <Modal
          open={true}
          toggle={this.props.toggle}
          className="add-student-modal"
        >
          <ModalHeader>Add Student</ModalHeader>
          <Form onSubmit={this.submit}>
            <ModalBody>
              <div className="modal-row">
                <span className="">Name</span>
                <FormInput
                  className=""
                  value={this.state.data.name}
                  type="text"
                  required
                  autoComplete="off"
                  name="name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="modal-row">
                <span className="">Graduation Year</span>
                <FormInput
                  className=""
                  value={this.state.data.graduationYear}
                  type="number"
                  autoComplete="off"
                  required
                  name="graduationYear"
                  onChange={this.handleChange}
                />
              </div>
              <div className="modal-row">
                <span className="">ID Number</span>
                <FormInput
                  className=""
                  value={this.state.data.idNumber}
                  type="number"
                  required
                  autoComplete="off"
                  name="idNumber"
                  onChange={this.handleChange}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button theme="danger" onClick={this.discardChangesAndClose}>
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </ModalFooter>
          </Form>
        </Modal>
      )
    } else return <div></div>
  }
}

export default AddStudentModal
