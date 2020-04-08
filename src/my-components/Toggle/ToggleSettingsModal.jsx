import React from "react";

import "./ToggleSettingsModal.scss";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  FormInput,
  Form,
  FormCheckbox,
  FormSelect
} from "shards-react";
import { sendAuthenticatedPostRequest } from "../../firebase";
import { connect } from "react-redux";
import constants from "../../client-side-private-files.json";

class ToggleSettingsModal extends React.Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.setState({ data: {...this.props.data} });
  }

  cancelAndClose = () => {
    if (!this.verifyData(this.props.data)) return;
    this.props.onClose(this.props.data);
    this.setState({ data: null });
  };
  saveAndClose = () => {
    if (!this.verifyData(this.state.data)) return
    this.props.onClose(this.state.data);
    this.setState({ data: null });
  };

  verifyData = (data) => {
    if (
      data.location &&
      data.location !== "" &&
      data.location !== " "
    )
      return true
    alert("Please enter a location")
    return false
  }

  handleChange = event => {
    const { value, name } = event.target;
    let newData = this.state.data;
    newData[name] = value;
    this.setState({ data: newData });
  };

  render() {
    if (this.state.data) {
      return (
        <Modal
          open={true}
          toggle={this.cancelAndClose}
          className="toggle-settings-modal"
        >
          <ModalHeader>Toggle Settings</ModalHeader>
          <ModalBody>
            <div className="user-editor-row mb-3">
              <span>Location</span>
              <FormInput
                value={this.state.data.location}
                type="text"
                required
                name="location"
                onChange={this.handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter style={{ position: "relative" }}>
            <Button theme="secondary" onClick={this.cancelAndClose}>
              Cancel
            </Button>
            <Button onClick={this.saveAndClose}>Save</Button>
          </ModalFooter>
        </Modal>
      );
    } else return null;
  }
}


export default ToggleSettingsModal
