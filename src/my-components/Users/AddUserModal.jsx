import React from "react"

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  FormInput,
  Form,
  FormSelect
} from "shards-react"
import { sendAuthenticatedPostRequest } from "../../firebase"
import { connect } from "react-redux"
import constants from '../../client-side-private-files.json'
import MyCheckbox from '../MyCheckbox'

class AddUserModal extends React.Component {
  state = {
    data: null,
    key: null
  }

  componentDidMount() {
        if (!this.props.data) return
        const data = Object.entries(this.props.data)
        console.log(data[0][0]);
        this.setState({ data: data[0][1], key: data[0][0]})
  }

  discardChangesAndClose = () => {
    this.props.onClose() 
    this.setState({ data: null, key: null })
  }
  saveChangesAndClose = async e => {
    e.preventDefault()
    this.props.onClose();
    const statusMessage = (await this.updateUser(this.state.key, this.state.data))
      ? "User was stored successfully!"
      : "An error occurred. The user could not be updated.";
    window.alert(statusMessage);
    this.setState({ data: null, key: null })
  }
  handleChange = event => {
    const { value, name } = event.target
    let newData = this.state.data
    newData[name] = value !== "None" ? value : null
    this.setState({ data: newData })
  }

  handleCheck = name => {
      let newData = this.state.data
      newData[name] = !newData[name]
      this.setState({ data: newData })
  }
  
  updateUser = async (key, data) => {
    const url = constants.FIREBASE_ADD_OR_MODIFY_USERS_FUNCTION_URL;
    const postBody = { key, data };
    const response = await sendAuthenticatedPostRequest(url, postBody);
    console.log(response);
    return response.status === 200
  }

  render() {
    if (this.state.data) {
      return (
        <Modal
          open={true}
          toggle={this.props.toggle}
          className="add-user-modal"
        >
          <ModalHeader>{this.state.data.name}</ModalHeader>
          <Form onSubmit={this.saveChangesAndClose}>
            <ModalBody>
              <div className="user-editor-row mb-3">
                <span>Email</span>
                <FormInput
                  value={this.state.data.email}
                  type="email"
                  required
                  name="email"
                  disabled={this.props.user.email === this.state.data.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="user-editor-row">
                <span>Toggle Students</span>
                <MyCheckbox
                  checked={this.state.data.toggleAccess}
                  onChange={() => this.handleCheck("toggleAccess")}
                />
              </div>
              <div className="user-editor-row">
                <span>Access Basic Pass Info</span>
                <MyCheckbox
                  checked={this.state.data.passAccess}
                  onChange={() => this.handleCheck("passAccess")}
                />
              </div>
              <div className="user-editor-row">
                <span>Notify Of Outstanding Students (> 15 min)</span>
                <MyCheckbox
                  checked={this.state.data.notifyOutstanding}
                  onChange={() => this.handleCheck("notifyOutstanding")}
                />
              </div>
              <div className="user-editor-row">
                <span>Access To Full Dashboard</span>
                <MyCheckbox
                  disabled={this.props.user.email === this.state.data.email}
                  checked={this.state.data.dashboardAccess}
                  onChange={() => {
                    if (this.props.user.email !== this.state.data.email)
                      this.handleCheck("dashboardAccess");
                  }}
                />
              </div>
              <div className="user-editor-row">
                <span>Can Send Notifications To</span>
                <FormSelect
                  value={
                    this.state.data.notificationSchool
                      ? this.state.data.notificationSchool
                      : "None"
                  }
                  name="notificationSchool"
                  onChange={this.handleChange}
                >
                  <option value="None">None</option>
                  <option value="4">All Users</option>
                  <option value="0">Seton Catholic Central</option>
                  <option value="1">St. John's</option>
                  <option value="2">All Saints</option>
                  <option value="3">St. James</option>
                </FormSelect>
              </div>
            </ModalBody>
            <ModalFooter style={{ position: "relative" }}>
              {this.props.user.email !== this.state.data.email &&
              this.state.key && this.state.key !== '' && this.state.key !== 'null' ? (
                <Button
                  theme="danger"
                  style={{ position: "absolute", left: "26px", top: "15px" }}
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this user? This cannot be undone."
                      )
                    ) {
                      this.props.onClose();
                      const statusMessage = (await this.updateUser(
                        this.state.key,
                        null
                      ))
                        ? "User successfully deleted. They will no longer be able to use any administrative features."
                        : "An error occured and the user was not deleted";
                      window.alert(statusMessage);
                      this.setState({ data: null, email: null });
                    }
                  }}
                >
                  Delete User
                </Button>
              ) : null}
              <Button theme="secondary" onClick={this.discardChangesAndClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </ModalFooter>
          </Form>
        </Modal>
      );
    } else return null
  }
}

const mapStateToProps = state => ({
  user: state.user.currentUser
})

export default connect(mapStateToProps)(AddUserModal)
